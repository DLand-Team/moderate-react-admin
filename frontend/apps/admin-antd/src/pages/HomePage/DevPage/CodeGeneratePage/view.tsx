import { FileTextOutlined, FolderOutlined } from "@ant-design/icons";
import { Card, Tabs, Tree } from "antd";
import { MdPreview } from "plugins/moderate-plugin-markdown/components/mdPreview";
import React, { useState } from "react";
import styles from "./styles.module.scss";
const { DirectoryTree } = Tree;

interface CodeFile {
  filePath: string;
  code: string;
}

interface TreeNode {
  title: string;
  key: string;
  isLeaf: boolean;
  children?: TreeNode[];
  icon?: React.ReactNode;
  content?: string;
}
function splitFilePath(filePath: string): string[] {
  const parts = filePath.split("/");
  const result: string[] = [];
  let i = 0;

  while (i < parts.length) {
    const part = parts[i];

    // 检查是否是基础包名
    if (
      part === "cn" &&
      i + 4 < parts.length &&
      parts[i + 1] === "iocoder" &&
      parts[i + 2] === "yudao" &&
      parts[i + 3] === "module" &&
      parts[i + 4] === "infra"
    ) {
      // 合并基础包名及其后续部分
      let packagePath = parts.slice(i, i + 5).join(".");
      i += 5;

      // 继续添加包名后的部分（如果有）
      while (i < parts.length && parts[i].includes(".")) {
        packagePath += "." + parts[i];
        i++;
      }

      result.push(packagePath);
    } else {
      result.push(part);
      i++;
    }
  }

  return result;
}
function convertToMarkdownCode(javaCode: string) {
  // 使用三个反引号包裹代码，并指定语言为java
  return `\`\`\`java
${javaCode}
\`\`\``;
}
const CodeViewer: React.FC<{ data: CodeFile[] }> = ({ data }) => {
  const [activeKey, setActiveKey] = useState<string | null>(null);

  // // 构建树形数据结构
  const buildTreeData = (files: CodeFile[]): TreeNode[] => {
    const root: Record<string, any> = {};

    files.forEach((file) => {
      const pathParts = splitFilePath(file.filePath);
      let currentLevel = root;

      pathParts.forEach((part, index) => {
        if (!currentLevel[part]) {
          currentLevel[part] = {};

          // 如果是文件（最后一部分）
          if (index === pathParts.length - 1) {
            currentLevel[part].isLeaf = true;
            currentLevel[part].content = file.code;
            currentLevel[part].key = file.filePath;
          }
        }
        currentLevel = currentLevel[part];
      });
    });

    const convertToAntdFormat = (
      node: Record<string, any>,
      path: string = "",
    ): TreeNode[] => {
      return Object.keys(node).map((key) => {
        const fullPath = path ? `${path}/${key}` : key;
        const isLeaf = node[key].isLeaf;
        return {
          title: key,
          // 替换. 为 /
          key: fullPath,
          isLeaf,
          icon: isLeaf ? <FileTextOutlined /> : <FolderOutlined />,
          children: isLeaf
            ? undefined
            : convertToAntdFormat(node[key], fullPath),
          ...(isLeaf ? { content: node[key].content } : {}),
        };
      });
    };
    return convertToAntdFormat(root);
  };

  const treeData = buildTreeData(data).slice(0, -1);
  const onSelect = (_: React.Key[], info: any) => {
    // 点击tree节点，判断是不是文件，是的话设置这个文件为当前激活的文件
    if (info.node.isLeaf) {
      setActiveKey(info.node.key as string);
    }
  };

  const currentCode = activeKey
    ? data.find((file) => splitFilePath(file.filePath).join("/") === activeKey)
        ?.code
    : data[0].code;

  return (
    <div
      className={styles.content}
      style={{
        height: "100%",
        overflow: "hidden",
        display: "flex",
        gap: 16,
      }}
    >
      <div
        style={{
          flex: 1,
          height: "100%",
        }}
      >
        <DirectoryTree
          selectedKeys={activeKey ? [activeKey] : []}
          defaultExpandAll
          onSelect={onSelect}
          treeData={treeData}
          style={{
            height: "100%",
            padding: "0 8px",
            overflow: "auto",
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 2,
          height: "100%",
          overflow: "hidden",
        }}
      >
        <Tabs
          type="line"
          onChange={(e) => {
            setActiveKey(splitFilePath(e).join("/"));
          }}
          activeKey={activeKey || undefined}
          items={data.map((file) => ({
            key: splitFilePath(file.filePath).join("/"),
            value: file.filePath,
            label: file.filePath.split("/").pop(),
            // children: (
            // 	<Card
            // 		style={{
            // 			overflow: "auto",
            // 		}}
            // 		// 我要修改ant-card-body的样式 padding 为0
            // 	>
            // 		<MdPreview>
            // 			{convertToMarkdownCode(file.code)}
            // 		</MdPreview>
            // 	</Card>
            // ),
          }))}
        ></Tabs>
        <Card
          style={{
            flex: 1,
            overflow: "auto",
          }}
        >
          <MdPreview>
            {currentCode ? convertToMarkdownCode(currentCode!) : ""}
          </MdPreview>
        </Card>
      </div>
    </div>
  );
};

// 使用示例
export const View: React.FC = () => {
  // 使用示例
  const data: any[] = [
    {
      filePath:
        "yudao-module-infra/src/main/java/cn/iocoder/yudao/module/infra/controller/admin/apiaccesslog/vo/ApiAccessLogPageReqVO.java",
      code: 'package cn.iocoder.yudao.module.infra.controller.admin.apiaccesslog.vo;\n\nimport lombok.*;\nimport java.util.*;\nimport io.swagger.v3.oas.annotations.media.Schema;\nimport cn.iocoder.yudao.framework.common.pojo.PageParam;\nimport org.springframework.format.annotation.DateTimeFormat;\nimport java.time.LocalDateTime;\n\nimport static cn.iocoder.yudao.framework.common.util.date.DateUtils.FORMAT_YEAR_MONTH_DAY_HOUR_MINUTE_SECOND;\n\n@Schema(description = "管理后台 - API 访问日志分页 Request VO")\n@Data\npublic class ApiAccessLogPageReqVO extends PageParam {\n\n    @Schema(description = "链路追踪编号", example = "1520")\n    private String traceId;\n\n    @Schema(description = "用户编号", example = "3879")\n    private Long userId;\n\n    @Schema(description = "用户类型", example = "2")\n    private Integer userType;\n\n    @Schema(description = "应用名", example = "张三")\n    private String applicationName;\n\n    @Schema(description = "请求方法名")\n    private String requestMethod;\n\n    @Schema(description = "请求地址", example = "https://www.iocoder.cn")\n    private String requestUrl;\n\n    @Schema(description = "请求参数")\n    private String requestParams;\n\n    @Schema(description = "响应结果")\n    private String responseBody;\n\n    @Schema(description = "用户 IP")\n    private String userIp;\n\n    @Schema(description = "浏览器 UA")\n    private String userAgent;\n\n    @Schema(description = "操作模块")\n    private String operateModule;\n\n    @Schema(description = "操作名", example = "李四")\n    private String operateName;\n\n    @Schema(description = "操作分类", example = "2")\n    private Integer operateType;\n\n    @Schema(description = "开始请求时间")\n    @DateTimeFormat(pattern = FORMAT_YEAR_MONTH_DAY_HOUR_MINUTE_SECOND)\n    private LocalDateTime[] beginTime;\n\n    @Schema(description = "结束请求时间")\n    @DateTimeFormat(pattern = FORMAT_YEAR_MONTH_DAY_HOUR_MINUTE_SECOND)\n    private LocalDateTime[] endTime;\n\n    @Schema(description = "执行时长")\n    private Integer duration;\n\n    @Schema(description = "结果码")\n    private Integer resultCode;\n\n    @Schema(description = "结果提示")\n    private String resultMsg;\n\n    @Schema(description = "创建时间")\n    @DateTimeFormat(pattern = FORMAT_YEAR_MONTH_DAY_HOUR_MINUTE_SECOND)\n    private LocalDateTime[] createTime;\n\n}',
    },
    {
      filePath:
        "yudao-module-infra/src/main/java/cn/iocoder/yudao/module/infra/controller/admin/apiaccesslog/vo/ApiAccessLogRespVO.java",
      code: 'package cn.iocoder.yudao.module.infra.controller.admin.apiaccesslog.vo;\n\nimport io.swagger.v3.oas.annotations.media.Schema;\nimport lombok.*;\nimport java.util.*;\nimport org.springframework.format.annotation.DateTimeFormat;\nimport java.time.LocalDateTime;\nimport com.alibaba.excel.annotation.*;\n\n@Schema(description = "管理后台 - API 访问日志 Response VO")\n@Data\n@ExcelIgnoreUnannotated\npublic class ApiAccessLogRespVO {\n\n    @Schema(description = "日志主键", requiredMode = Schema.RequiredMode.REQUIRED, example = "6809")\n    @ExcelProperty("日志主键")\n    private Long id;\n\n    @Schema(description = "链路追踪编号", requiredMode = Schema.RequiredMode.REQUIRED, example = "1520")\n    @ExcelProperty("链路追踪编号")\n    private String traceId;\n\n    @Schema(description = "用户编号", requiredMode = Schema.RequiredMode.REQUIRED, example = "3879")\n    @ExcelProperty("用户编号")\n    private Long userId;\n\n    @Schema(description = "用户类型", requiredMode = Schema.RequiredMode.REQUIRED, example = "2")\n    @ExcelProperty("用户类型")\n    private Integer userType;\n\n    @Schema(description = "应用名", requiredMode = Schema.RequiredMode.REQUIRED, example = "张三")\n    @ExcelProperty("应用名")\n    private String applicationName;\n\n    @Schema(description = "请求方法名", requiredMode = Schema.RequiredMode.REQUIRED)\n    @ExcelProperty("请求方法名")\n    private String requestMethod;\n\n    @Schema(description = "请求地址", requiredMode = Schema.RequiredMode.REQUIRED, example = "https://www.iocoder.cn")\n    @ExcelProperty("请求地址")\n    private String requestUrl;\n\n    @Schema(description = "请求参数")\n    @ExcelProperty("请求参数")\n    private String requestParams;\n\n    @Schema(description = "响应结果")\n    @ExcelProperty("响应结果")\n    private String responseBody;\n\n    @Schema(description = "用户 IP", requiredMode = Schema.RequiredMode.REQUIRED)\n    @ExcelProperty("用户 IP")\n    private String userIp;\n\n    @Schema(description = "浏览器 UA", requiredMode = Schema.RequiredMode.REQUIRED)\n    @ExcelProperty("浏览器 UA")\n    private String userAgent;\n\n    @Schema(description = "操作模块")\n    @ExcelProperty("操作模块")\n    private String operateModule;\n\n    @Schema(description = "操作名", example = "李四")\n    @ExcelProperty("操作名")\n    private String operateName;\n\n    @Schema(description = "操作分类", example = "2")\n    @ExcelProperty("操作分类")\n    private Integer operateType;\n\n    @Schema(description = "开始请求时间", requiredMode = Schema.RequiredMode.REQUIRED)\n    @ExcelProperty("开始请求时间")\n    private LocalDateTime beginTime;\n\n    @Schema(description = "结束请求时间", requiredMode = Schema.RequiredMode.REQUIRED)\n    @ExcelProperty("结束请求时间")\n    private LocalDateTime endTime;\n\n    @Schema(description = "执行时长", requiredMode = Schema.RequiredMode.REQUIRED)\n    @ExcelProperty("执行时长")\n    private Integer duration;\n\n    @Schema(description = "结果码", requiredMode = Schema.RequiredMode.REQUIRED)\n    @ExcelProperty("结果码")\n    private Integer resultCode;\n\n    @Schema(description = "结果提示")\n    @ExcelProperty("结果提示")\n    private String resultMsg;\n\n    @Schema(description = "创建时间", requiredMode = Schema.RequiredMode.REQUIRED)\n    @ExcelProperty("创建时间")\n    private LocalDateTime createTime;\n\n}',
    },
    {
      filePath:
        "yudao-module-infra/src/main/java/cn/iocoder/yudao/module/infra/controller/admin/apiaccesslog/vo/ApiAccessLogSaveReqVO.java",
      code: 'package cn.iocoder.yudao.module.infra.controller.admin.apiaccesslog.vo;\n\nimport io.swagger.v3.oas.annotations.media.Schema;\nimport lombok.*;\nimport java.util.*;\nimport javax.validation.constraints.*;\nimport org.springframework.format.annotation.DateTimeFormat;\nimport java.time.LocalDateTime;\n\n@Schema(description = "管理后台 - API 访问日志新增/修改 Request VO")\n@Data\npublic class ApiAccessLogSaveReqVO {\n\n    @Schema(description = "日志主键", requiredMode = Schema.RequiredMode.REQUIRED, example = "6809")\n    private Long id;\n\n    @Schema(description = "链路追踪编号", requiredMode = Schema.RequiredMode.REQUIRED, example = "1520")\n    @NotEmpty(message = "链路追踪编号不能为空")\n    private String traceId;\n\n    @Schema(description = "用户编号", requiredMode = Schema.RequiredMode.REQUIRED, example = "3879")\n    @NotNull(message = "用户编号不能为空")\n    private Long userId;\n\n    @Schema(description = "用户类型", requiredMode = Schema.RequiredMode.REQUIRED, example = "2")\n    @NotNull(message = "用户类型不能为空")\n    private Integer userType;\n\n    @Schema(description = "应用名", requiredMode = Schema.RequiredMode.REQUIRED, example = "张三")\n    @NotEmpty(message = "应用名不能为空")\n    private String applicationName;\n\n    @Schema(description = "请求方法名", requiredMode = Schema.RequiredMode.REQUIRED)\n    @NotEmpty(message = "请求方法名不能为空")\n    private String requestMethod;\n\n    @Schema(description = "请求地址", requiredMode = Schema.RequiredMode.REQUIRED, example = "https://www.iocoder.cn")\n    @NotEmpty(message = "请求地址不能为空")\n    private String requestUrl;\n\n    @Schema(description = "请求参数")\n    private String requestParams;\n\n    @Schema(description = "响应结果")\n    private String responseBody;\n\n    @Schema(description = "用户 IP", requiredMode = Schema.RequiredMode.REQUIRED)\n    @NotEmpty(message = "用户 IP不能为空")\n    private String userIp;\n\n    @Schema(description = "浏览器 UA", requiredMode = Schema.RequiredMode.REQUIRED)\n    @NotEmpty(message = "浏览器 UA不能为空")\n    private String userAgent;\n\n    @Schema(description = "操作模块")\n    private String operateModule;\n\n    @Schema(description = "操作名", example = "李四")\n    private String operateName;\n\n    @Schema(description = "操作分类", example = "2")\n    private Integer operateType;\n\n    @Schema(description = "开始请求时间", requiredMode = Schema.RequiredMode.REQUIRED)\n    @NotNull(message = "开始请求时间不能为空")\n    private LocalDateTime beginTime;\n\n    @Schema(description = "结束请求时间", requiredMode = Schema.RequiredMode.REQUIRED)\n    @NotNull(message = "结束请求时间不能为空")\n    private LocalDateTime endTime;\n\n    @Schema(description = "执行时长", requiredMode = Schema.RequiredMode.REQUIRED)\n    @NotNull(message = "执行时长不能为空")\n    private Integer duration;\n\n    @Schema(description = "结果码", requiredMode = Schema.RequiredMode.REQUIRED)\n    @NotNull(message = "结果码不能为空")\n    private Integer resultCode;\n\n    @Schema(description = "结果提示")\n    private String resultMsg;\n\n}',
    },
    {
      filePath:
        "yudao-module-infra/src/main/java/cn/iocoder/yudao/module/infra/controller/admin/apiaccesslog/ApiAccessLogController.java",
      code: 'package cn.iocoder.yudao.module.infra.controller.admin.apiaccesslog;\n\nimport org.springframework.web.bind.annotation.*;\nimport javax.annotation.Resource;\nimport org.springframework.validation.annotation.Validated;\nimport org.springframework.security.access.prepost.PreAuthorize;\nimport io.swagger.v3.oas.annotations.tags.Tag;\nimport io.swagger.v3.oas.annotations.Parameter;\nimport io.swagger.v3.oas.annotations.Operation;\n\nimport javax.validation.constraints.*;\nimport javax.validation.*;\nimport javax.servlet.http.*;\nimport java.util.*;\nimport java.io.IOException;\n\nimport cn.iocoder.yudao.framework.common.pojo.PageParam;\nimport cn.iocoder.yudao.framework.common.pojo.PageResult;\nimport cn.iocoder.yudao.framework.common.pojo.CommonResult;\nimport cn.iocoder.yudao.framework.common.util.object.BeanUtils;\nimport static cn.iocoder.yudao.framework.common.pojo.CommonResult.success;\n\nimport cn.iocoder.yudao.framework.excel.core.util.ExcelUtils;\n\nimport cn.iocoder.yudao.framework.apilog.core.annotation.ApiAccessLog;\nimport static cn.iocoder.yudao.framework.apilog.core.enums.OperateTypeEnum.*;\n\nimport cn.iocoder.yudao.module.infra.controller.admin.apiaccesslog.vo.*;\nimport cn.iocoder.yudao.module.infra.dal.dataobject.apiaccesslog.ApiAccessLogDO;\nimport cn.iocoder.yudao.module.infra.service.apiaccesslog.ApiAccessLogService;\n\n@Tag(name = "管理后台 - API 访问日志")\n@RestController\n@RequestMapping("/infra/api-access-log")\n@Validated\npublic class ApiAccessLogController {\n\n    @Resource\n    private ApiAccessLogService apiAccessLogService;\n\n    @PostMapping("/create")\n    @Operation(summary = "创建API 访问日志")\n    @PreAuthorize("@ss.hasPermission(\'infra:api-access-log:create\')")\n    public CommonResult<Long> createApiAccessLog(@Valid @RequestBody ApiAccessLogSaveReqVO createReqVO) {\n        return success(apiAccessLogService.createApiAccessLog(createReqVO));\n    }\n\n    @PutMapping("/update")\n    @Operation(summary = "更新API 访问日志")\n    @PreAuthorize("@ss.hasPermission(\'infra:api-access-log:update\')")\n    public CommonResult<Boolean> updateApiAccessLog(@Valid @RequestBody ApiAccessLogSaveReqVO updateReqVO) {\n        apiAccessLogService.updateApiAccessLog(updateReqVO);\n        return success(true);\n    }\n\n    @DeleteMapping("/delete")\n    @Operation(summary = "删除API 访问日志")\n    @Parameter(name = "id", description = "编号", required = true)\n    @PreAuthorize("@ss.hasPermission(\'infra:api-access-log:delete\')")\n    public CommonResult<Boolean> deleteApiAccessLog(@RequestParam("id") Long id) {\n        apiAccessLogService.deleteApiAccessLog(id);\n        return success(true);\n    }\n\n    @DeleteMapping("/delete-list")\n    @Parameter(name = "ids", description = "编号", required = true)\n    @Operation(summary = "批量删除API 访问日志")\n                @PreAuthorize("@ss.hasPermission(\'infra:api-access-log:delete\')")\n    public CommonResult<Boolean> deleteApiAccessLogList(@RequestParam("ids") List<Long> ids) {\n        apiAccessLogService.deleteApiAccessLogListByIds(ids);\n        return success(true);\n    }\n\n    @GetMapping("/get")\n    @Operation(summary = "获得API 访问日志")\n    @Parameter(name = "id", description = "编号", required = true, example = "1024")\n    @PreAuthorize("@ss.hasPermission(\'infra:api-access-log:query\')")\n    public CommonResult<ApiAccessLogRespVO> getApiAccessLog(@RequestParam("id") Long id) {\n        ApiAccessLogDO apiAccessLog = apiAccessLogService.getApiAccessLog(id);\n        return success(BeanUtils.toBean(apiAccessLog, ApiAccessLogRespVO.class));\n    }\n\n    @GetMapping("/page")\n    @Operation(summary = "获得API 访问日志分页")\n    @PreAuthorize("@ss.hasPermission(\'infra:api-access-log:query\')")\n    public CommonResult<PageResult<ApiAccessLogRespVO>> getApiAccessLogPage(@Valid ApiAccessLogPageReqVO pageReqVO) {\n        PageResult<ApiAccessLogDO> pageResult = apiAccessLogService.getApiAccessLogPage(pageReqVO);\n        return success(BeanUtils.toBean(pageResult, ApiAccessLogRespVO.class));\n    }\n\n    @GetMapping("/export-excel")\n    @Operation(summary = "导出API 访问日志 Excel")\n    @PreAuthorize("@ss.hasPermission(\'infra:api-access-log:export\')")\n    @ApiAccessLog(operateType = EXPORT)\n    public void exportApiAccessLogExcel(@Valid ApiAccessLogPageReqVO pageReqVO,\n              HttpServletResponse response) throws IOException {\n        pageReqVO.setPageSize(PageParam.PAGE_SIZE_NONE);\n        List<ApiAccessLogDO> list = apiAccessLogService.getApiAccessLogPage(pageReqVO).getList();\n        // 导出 Excel\n        ExcelUtils.write(response, "API 访问日志.xls", "数据", ApiAccessLogRespVO.class,\n                        BeanUtils.toBean(list, ApiAccessLogRespVO.class));\n    }\n\n}',
    },
    {
      filePath:
        "yudao-module-infra/src/main/java/cn/iocoder/yudao/module/infra/dal/dataobject/apiaccesslog/ApiAccessLogDO.java",
      code: 'package cn.iocoder.yudao.module.infra.dal.dataobject.apiaccesslog;\n\nimport lombok.*;\nimport java.util.*;\nimport java.time.LocalDateTime;\nimport java.time.LocalDateTime;\nimport java.time.LocalDateTime;\nimport java.time.LocalDateTime;\nimport com.baomidou.mybatisplus.annotation.*;\nimport cn.iocoder.yudao.framework.mybatis.core.dataobject.BaseDO;\n\n/**\n * API 访问日志 DO\n *\n * @author 芋道源码\n */\n@TableName("infra_api_access_log")\n@KeySequence("infra_api_access_log_seq") // 用于 Oracle、PostgreSQL、Kingbase、DB2、H2 数据库的主键自增。如果是 MySQL 等数据库，可不写。\n@Data\n@EqualsAndHashCode(callSuper = true)\n@ToString(callSuper = true)\n@Builder\n@NoArgsConstructor\n@AllArgsConstructor\npublic class ApiAccessLogDO extends BaseDO {\n\n    /**\n     * 日志主键\n     */\n    @TableId\n    private Long id;\n    /**\n     * 链路追踪编号\n     */\n    private String traceId;\n    /**\n     * 用户编号\n     */\n    private Long userId;\n    /**\n     * 用户类型\n     */\n    private Integer userType;\n    /**\n     * 应用名\n     */\n    private String applicationName;\n    /**\n     * 请求方法名\n     */\n    private String requestMethod;\n    /**\n     * 请求地址\n     */\n    private String requestUrl;\n    /**\n     * 请求参数\n     */\n    private String requestParams;\n    /**\n     * 响应结果\n     */\n    private String responseBody;\n    /**\n     * 用户 IP\n     */\n    private String userIp;\n    /**\n     * 浏览器 UA\n     */\n    private String userAgent;\n    /**\n     * 操作模块\n     */\n    private String operateModule;\n    /**\n     * 操作名\n     */\n    private String operateName;\n    /**\n     * 操作分类\n     */\n    private Integer operateType;\n    /**\n     * 开始请求时间\n     */\n    private LocalDateTime beginTime;\n    /**\n     * 结束请求时间\n     */\n    private LocalDateTime endTime;\n    /**\n     * 执行时长\n     */\n    private Integer duration;\n    /**\n     * 结果码\n     */\n    private Integer resultCode;\n    /**\n     * 结果提示\n     */\n    private String resultMsg;\n\n\n}',
    },
    {
      filePath:
        "yudao-module-infra/src/main/java/cn/iocoder/yudao/module/infra/dal/mysql/apiaccesslog/ApiAccessLogMapper.java",
      code: "package cn.iocoder.yudao.module.infra.dal.mysql.apiaccesslog;\n\nimport java.util.*;\n\nimport cn.iocoder.yudao.framework.common.pojo.PageResult;\nimport cn.iocoder.yudao.framework.mybatis.core.query.LambdaQueryWrapperX;\nimport cn.iocoder.yudao.framework.mybatis.core.mapper.BaseMapperX;\nimport cn.iocoder.yudao.module.infra.dal.dataobject.apiaccesslog.ApiAccessLogDO;\nimport org.apache.ibatis.annotations.Mapper;\nimport cn.iocoder.yudao.module.infra.controller.admin.apiaccesslog.vo.*;\n\n/**\n * API 访问日志 Mapper\n *\n * @author 芋道源码\n */\n@Mapper\npublic interface ApiAccessLogMapper extends BaseMapperX<ApiAccessLogDO> {\n\n    default PageResult<ApiAccessLogDO> selectPage(ApiAccessLogPageReqVO reqVO) {\n        return selectPage(reqVO, new LambdaQueryWrapperX<ApiAccessLogDO>()\n                .eqIfPresent(ApiAccessLogDO::getTraceId, reqVO.getTraceId())\n                .eqIfPresent(ApiAccessLogDO::getUserId, reqVO.getUserId())\n                .eqIfPresent(ApiAccessLogDO::getUserType, reqVO.getUserType())\n                .likeIfPresent(ApiAccessLogDO::getApplicationName, reqVO.getApplicationName())\n                .eqIfPresent(ApiAccessLogDO::getRequestMethod, reqVO.getRequestMethod())\n                .eqIfPresent(ApiAccessLogDO::getRequestUrl, reqVO.getRequestUrl())\n                .eqIfPresent(ApiAccessLogDO::getRequestParams, reqVO.getRequestParams())\n                .eqIfPresent(ApiAccessLogDO::getResponseBody, reqVO.getResponseBody())\n                .eqIfPresent(ApiAccessLogDO::getUserIp, reqVO.getUserIp())\n                .eqIfPresent(ApiAccessLogDO::getUserAgent, reqVO.getUserAgent())\n                .eqIfPresent(ApiAccessLogDO::getOperateModule, reqVO.getOperateModule())\n                .likeIfPresent(ApiAccessLogDO::getOperateName, reqVO.getOperateName())\n                .eqIfPresent(ApiAccessLogDO::getOperateType, reqVO.getOperateType())\n                .betweenIfPresent(ApiAccessLogDO::getBeginTime, reqVO.getBeginTime())\n                .betweenIfPresent(ApiAccessLogDO::getEndTime, reqVO.getEndTime())\n                .eqIfPresent(ApiAccessLogDO::getDuration, reqVO.getDuration())\n                .eqIfPresent(ApiAccessLogDO::getResultCode, reqVO.getResultCode())\n                .eqIfPresent(ApiAccessLogDO::getResultMsg, reqVO.getResultMsg())\n                .betweenIfPresent(ApiAccessLogDO::getCreateTime, reqVO.getCreateTime())\n                .orderByDesc(ApiAccessLogDO::getId));\n    }\n\n}",
    },
    {
      filePath:
        "yudao-module-infra/src/main/resources/mapper/apiaccesslog/ApiAccessLogMapper.xml",
      code: '<?xml version="1.0" encoding="UTF-8"?>\n<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd">\n<mapper namespace="cn.iocoder.yudao.module.infra.dal.mysql.apiaccesslog.ApiAccessLogMapper">\n\n    <!--\n        一般情况下，尽可能使用 Mapper 进行 CRUD 增删改查即可。\n        无法满足的场景，例如说多表关联查询，才使用 XML 编写 SQL。\n        代码生成器暂时只生成 Mapper XML 文件本身，更多推荐 MybatisX 快速开发插件来生成查询。\n        文档可见：https://www.iocoder.cn/MyBatis/x-plugins/\n     -->\n\n</mapper>',
    },
    {
      filePath:
        "yudao-module-infra/src/main/java/cn/iocoder/yudao/module/infra/service/apiaccesslog/ApiAccessLogServiceImpl.java",
      code: "package cn.iocoder.yudao.module.infra.service.apiaccesslog;\n\nimport cn.hutool.core.collection.CollUtil;\nimport org.springframework.stereotype.Service;\nimport javax.annotation.Resource;\nimport org.springframework.validation.annotation.Validated;\nimport org.springframework.transaction.annotation.Transactional;\n\nimport java.util.*;\nimport cn.iocoder.yudao.module.infra.controller.admin.apiaccesslog.vo.*;\nimport cn.iocoder.yudao.module.infra.dal.dataobject.apiaccesslog.ApiAccessLogDO;\nimport cn.iocoder.yudao.framework.common.pojo.PageResult;\nimport cn.iocoder.yudao.framework.common.pojo.PageParam;\nimport cn.iocoder.yudao.framework.common.util.object.BeanUtils;\n\nimport cn.iocoder.yudao.module.infra.dal.mysql.apiaccesslog.ApiAccessLogMapper;\n\nimport static cn.iocoder.yudao.framework.common.exception.util.ServiceExceptionUtil.exception;\nimport static cn.iocoder.yudao.framework.common.util.collection.CollectionUtils.convertList;\nimport static cn.iocoder.yudao.framework.common.util.collection.CollectionUtils.diffList;\nimport static cn.iocoder.yudao.module.infra.enums.ErrorCodeConstants.*;\n\n/**\n * API 访问日志 Service 实现类\n *\n * @author 芋道源码\n */\n@Service\n@Validated\npublic class ApiAccessLogServiceImpl implements ApiAccessLogService {\n\n    @Resource\n    private ApiAccessLogMapper apiAccessLogMapper;\n\n    @Override\n    public Long createApiAccessLog(ApiAccessLogSaveReqVO createReqVO) {\n        // 插入\n        ApiAccessLogDO apiAccessLog = BeanUtils.toBean(createReqVO, ApiAccessLogDO.class);\n        apiAccessLogMapper.insert(apiAccessLog);\n        // 返回\n        return apiAccessLog.getId();\n    }\n\n    @Override\n    public void updateApiAccessLog(ApiAccessLogSaveReqVO updateReqVO) {\n        // 校验存在\n        validateApiAccessLogExists(updateReqVO.getId());\n        // 更新\n        ApiAccessLogDO updateObj = BeanUtils.toBean(updateReqVO, ApiAccessLogDO.class);\n        apiAccessLogMapper.updateById(updateObj);\n    }\n\n    @Override\n    public void deleteApiAccessLog(Long id) {\n        // 校验存在\n        validateApiAccessLogExists(id);\n        // 删除\n        apiAccessLogMapper.deleteById(id);\n    }\n\n    @Override\n        public void deleteApiAccessLogListByIds(List<Long> ids) {\n        // 校验存在\n        validateApiAccessLogExists(ids);\n        // 删除\n        apiAccessLogMapper.deleteByIds(ids);\n        }\n\n    private void validateApiAccessLogExists(List<Long> ids) {\n        List<ApiAccessLogDO> list = apiAccessLogMapper.selectByIds(ids);\n        if (CollUtil.isEmpty(list) || list.size() != ids.size()) {\n            throw exception(API_ACCESS_LOG_NOT_EXISTS);\n        }\n    }\n\n    private void validateApiAccessLogExists(Long id) {\n        if (apiAccessLogMapper.selectById(id) == null) {\n            throw exception(API_ACCESS_LOG_NOT_EXISTS);\n        }\n    }\n\n    @Override\n    public ApiAccessLogDO getApiAccessLog(Long id) {\n        return apiAccessLogMapper.selectById(id);\n    }\n\n    @Override\n    public PageResult<ApiAccessLogDO> getApiAccessLogPage(ApiAccessLogPageReqVO pageReqVO) {\n        return apiAccessLogMapper.selectPage(pageReqVO);\n    }\n\n}",
    },
    {
      filePath:
        "yudao-module-infra/src/main/java/cn/iocoder/yudao/module/infra/service/apiaccesslog/ApiAccessLogService.java",
      code: "package cn.iocoder.yudao.module.infra.service.apiaccesslog;\n\nimport java.util.*;\nimport javax.validation.*;\nimport cn.iocoder.yudao.module.infra.controller.admin.apiaccesslog.vo.*;\nimport cn.iocoder.yudao.module.infra.dal.dataobject.apiaccesslog.ApiAccessLogDO;\nimport cn.iocoder.yudao.framework.common.pojo.PageResult;\nimport cn.iocoder.yudao.framework.common.pojo.PageParam;\n\n/**\n * API 访问日志 Service 接口\n *\n * @author 芋道源码\n */\npublic interface ApiAccessLogService {\n\n    /**\n     * 创建API 访问日志\n     *\n     * @param createReqVO 创建信息\n     * @return 编号\n     */\n    Long createApiAccessLog(@Valid ApiAccessLogSaveReqVO createReqVO);\n\n    /**\n     * 更新API 访问日志\n     *\n     * @param updateReqVO 更新信息\n     */\n    void updateApiAccessLog(@Valid ApiAccessLogSaveReqVO updateReqVO);\n\n    /**\n     * 删除API 访问日志\n     *\n     * @param id 编号\n     */\n    void deleteApiAccessLog(Long id);\n\n    /**\n    * 批量删除API 访问日志\n    *\n    * @param ids 编号\n    */\n    void deleteApiAccessLogListByIds(List<Long> ids);\n\n    /**\n     * 获得API 访问日志\n     *\n     * @param id 编号\n     * @return API 访问日志\n     */\n    ApiAccessLogDO getApiAccessLog(Long id);\n\n    /**\n     * 获得API 访问日志分页\n     *\n     * @param pageReqVO 分页查询\n     * @return API 访问日志分页\n     */\n    PageResult<ApiAccessLogDO> getApiAccessLogPage(ApiAccessLogPageReqVO pageReqVO);\n\n}",
    },
    {
      filePath:
        "yudao-module-infra/src/main/java/cn/iocoder/yudao/module/infra/enums/ErrorCodeConstants_手动操作.java",
      code: '// TODO 待办：请将下面的错误码复制到 yudao-module-infra 模块的 ErrorCodeConstants 类中。注意，请给“TODO 补充编号”设置一个错误码编号！！！\n// ========== API 访问日志 TODO 补充编号 ==========\nErrorCode API_ACCESS_LOG_NOT_EXISTS = new ErrorCode(TODO 补充编号, "API 访问日志不存在");',
    },
    {
      filePath: "sql/sql.sql",
      code: "-- 菜单 SQL\nINSERT INTO system_menu(\n    name, permission, type, sort, parent_id,\n    path, icon, component, status, component_name\n)\nVALUES (\n    'API 访问日志管理', '', 2, 0, ${table.parentMenuId},\n    'api-access-log', '', 'infra/apiaccesslog/index', 0, 'ApiAccessLog'\n);\n\n-- 按钮父菜单ID\n-- 暂时只支持 MySQL。如果你是 Oracle、PostgreSQL、SQLServer 的话，需要手动修改 @parentId 的部分的代码\nSELECT @parentId := LAST_INSERT_ID();\n\n-- 按钮 SQL\nINSERT INTO system_menu(\n    name, permission, type, sort, parent_id,\n    path, icon, component, status\n)\nVALUES (\n    'API 访问日志查询', 'infra:api-access-log:query', 3, 1, @parentId,\n    '', '', '', 0\n);\nINSERT INTO system_menu(\n    name, permission, type, sort, parent_id,\n    path, icon, component, status\n)\nVALUES (\n    'API 访问日志创建', 'infra:api-access-log:create', 3, 2, @parentId,\n    '', '', '', 0\n);\nINSERT INTO system_menu(\n    name, permission, type, sort, parent_id,\n    path, icon, component, status\n)\nVALUES (\n    'API 访问日志更新', 'infra:api-access-log:update', 3, 3, @parentId,\n    '', '', '', 0\n);\nINSERT INTO system_menu(\n    name, permission, type, sort, parent_id,\n    path, icon, component, status\n)\nVALUES (\n    'API 访问日志删除', 'infra:api-access-log:delete', 3, 4, @parentId,\n    '', '', '', 0\n);\nINSERT INTO system_menu(\n    name, permission, type, sort, parent_id,\n    path, icon, component, status\n)\nVALUES (\n    'API 访问日志导出', 'infra:api-access-log:export', 3, 5, @parentId,\n    '', '', '', 0\n);",
    },
    {
      filePath: "yudao-ui-admin-vue3/src/views/infra/apiaccesslog/index.vue",
      code: '<template>\n  <ContentWrap>\n    <!-- 搜索工作栏 -->\n    <el-form\n      class="-mb-15px"\n      :model="queryParams"\n      ref="queryFormRef"\n      :inline="true"\n      label-width="68px"\n    >\n      <el-form-item label="链路追踪编号" prop="traceId">\n        <el-input\n          v-model="queryParams.traceId"\n          placeholder="请输入链路追踪编号"\n          clearable\n          @keyup.enter="handleQuery"\n          class="!w-240px"\n        />\n      </el-form-item>\n      <el-form-item label="用户编号" prop="userId">\n        <el-input\n          v-model="queryParams.userId"\n          placeholder="请输入用户编号"\n          clearable\n          @keyup.enter="handleQuery"\n          class="!w-240px"\n        />\n      </el-form-item>\n      <el-form-item label="用户类型" prop="userType">\n        <el-select\n          v-model="queryParams.userType"\n          placeholder="请选择用户类型"\n          clearable\n          class="!w-240px"\n        >\n          <el-option label="请选择字典生成" value="" />\n        </el-select>\n      </el-form-item>\n      <el-form-item label="应用名" prop="applicationName">\n        <el-input\n          v-model="queryParams.applicationName"\n          placeholder="请输入应用名"\n          clearable\n          @keyup.enter="handleQuery"\n          class="!w-240px"\n        />\n      </el-form-item>\n      <el-form-item label="请求方法名" prop="requestMethod">\n        <el-input\n          v-model="queryParams.requestMethod"\n          placeholder="请输入请求方法名"\n          clearable\n          @keyup.enter="handleQuery"\n          class="!w-240px"\n        />\n      </el-form-item>\n      <el-form-item label="请求地址" prop="requestUrl">\n        <el-input\n          v-model="queryParams.requestUrl"\n          placeholder="请输入请求地址"\n          clearable\n          @keyup.enter="handleQuery"\n          class="!w-240px"\n        />\n      </el-form-item>\n      <el-form-item label="请求参数" prop="requestParams">\n        <el-input\n          v-model="queryParams.requestParams"\n          placeholder="请输入请求参数"\n          clearable\n          @keyup.enter="handleQuery"\n          class="!w-240px"\n        />\n      </el-form-item>\n      <el-form-item label="响应结果" prop="responseBody">\n        <el-input\n          v-model="queryParams.responseBody"\n          placeholder="请输入响应结果"\n          clearable\n          @keyup.enter="handleQuery"\n          class="!w-240px"\n        />\n      </el-form-item>\n      <el-form-item label="用户 IP" prop="userIp">\n        <el-input\n          v-model="queryParams.userIp"\n          placeholder="请输入用户 IP"\n          clearable\n          @keyup.enter="handleQuery"\n          class="!w-240px"\n        />\n      </el-form-item>\n      <el-form-item label="浏览器 UA" prop="userAgent">\n        <el-input\n          v-model="queryParams.userAgent"\n          placeholder="请输入浏览器 UA"\n          clearable\n          @keyup.enter="handleQuery"\n          class="!w-240px"\n        />\n      </el-form-item>\n      <el-form-item label="操作模块" prop="operateModule">\n        <el-input\n          v-model="queryParams.operateModule"\n          placeholder="请输入操作模块"\n          clearable\n          @keyup.enter="handleQuery"\n          class="!w-240px"\n        />\n      </el-form-item>\n      <el-form-item label="操作名" prop="operateName">\n        <el-input\n          v-model="queryParams.operateName"\n          placeholder="请输入操作名"\n          clearable\n          @keyup.enter="handleQuery"\n          class="!w-240px"\n        />\n      </el-form-item>\n      <el-form-item label="操作分类" prop="operateType">\n        <el-select\n          v-model="queryParams.operateType"\n          placeholder="请选择操作分类"\n          clearable\n          class="!w-240px"\n        >\n          <el-option label="请选择字典生成" value="" />\n        </el-select>\n      </el-form-item>\n      <el-form-item label="开始请求时间" prop="beginTime">\n        <el-date-picker\n          v-model="queryParams.beginTime"\n          value-format="YYYY-MM-DD HH:mm:ss"\n          type="daterange"\n          start-placeholder="开始日期"\n          end-placeholder="结束日期"\n          :default-time="[new Date(\'1 00:00:00\'), new Date(\'1 23:59:59\')]"\n          class="!w-220px"\n        />\n      </el-form-item>\n      <el-form-item label="结束请求时间" prop="endTime">\n        <el-date-picker\n          v-model="queryParams.endTime"\n          value-format="YYYY-MM-DD HH:mm:ss"\n          type="daterange"\n          start-placeholder="开始日期"\n          end-placeholder="结束日期"\n          :default-time="[new Date(\'1 00:00:00\'), new Date(\'1 23:59:59\')]"\n          class="!w-220px"\n        />\n      </el-form-item>\n      <el-form-item label="执行时长" prop="duration">\n        <el-input\n          v-model="queryParams.duration"\n          placeholder="请输入执行时长"\n          clearable\n          @keyup.enter="handleQuery"\n          class="!w-240px"\n        />\n      </el-form-item>\n      <el-form-item label="结果码" prop="resultCode">\n        <el-input\n          v-model="queryParams.resultCode"\n          placeholder="请输入结果码"\n          clearable\n          @keyup.enter="handleQuery"\n          class="!w-240px"\n        />\n      </el-form-item>\n      <el-form-item label="结果提示" prop="resultMsg">\n        <el-input\n          v-model="queryParams.resultMsg"\n          placeholder="请输入结果提示"\n          clearable\n          @keyup.enter="handleQuery"\n          class="!w-240px"\n        />\n      </el-form-item>\n      <el-form-item label="创建时间" prop="createTime">\n        <el-date-picker\n          v-model="queryParams.createTime"\n          value-format="YYYY-MM-DD HH:mm:ss"\n          type="daterange"\n          start-placeholder="开始日期"\n          end-placeholder="结束日期"\n          :default-time="[new Date(\'1 00:00:00\'), new Date(\'1 23:59:59\')]"\n          class="!w-220px"\n        />\n      </el-form-item>\n      <el-form-item>\n        <el-button @click="handleQuery"><Icon icon="ep:search" class="mr-5px" /> 搜索</el-button>\n        <el-button @click="resetQuery"><Icon icon="ep:refresh" class="mr-5px" /> 重置</el-button>\n        <el-button\n          type="primary"\n          plain\n          @click="openForm(\'create\')"\n          v-hasPermi="[\'infra:api-access-log:create\']"\n        >\n          <Icon icon="ep:plus" class="mr-5px" /> 新增\n        </el-button>\n        <el-button\n          type="success"\n          plain\n          @click="handleExport"\n          :loading="exportLoading"\n          v-hasPermi="[\'infra:api-access-log:export\']"\n        >\n          <Icon icon="ep:download" class="mr-5px" /> 导出\n        </el-button>\n      </el-form-item>\n    </el-form>\n  </ContentWrap>\n\n  <!-- 列表 -->\n  <ContentWrap>\n    <el-table v-loading="loading" :data="list" :stripe="true" :show-overflow-tooltip="true">\n      <el-table-column label="日志主键" align="center" prop="id" />\n      <el-table-column label="链路追踪编号" align="center" prop="traceId" />\n      <el-table-column label="用户编号" align="center" prop="userId" />\n      <el-table-column label="用户类型" align="center" prop="userType" />\n      <el-table-column label="应用名" align="center" prop="applicationName" />\n      <el-table-column label="请求方法名" align="center" prop="requestMethod" />\n      <el-table-column label="请求地址" align="center" prop="requestUrl" />\n      <el-table-column label="请求参数" align="center" prop="requestParams" />\n      <el-table-column label="响应结果" align="center" prop="responseBody" />\n      <el-table-column label="用户 IP" align="center" prop="userIp" />\n      <el-table-column label="浏览器 UA" align="center" prop="userAgent" />\n      <el-table-column label="操作模块" align="center" prop="operateModule" />\n      <el-table-column label="操作名" align="center" prop="operateName" />\n      <el-table-column label="操作分类" align="center" prop="operateType" />\n      <el-table-column\n        label="开始请求时间"\n        align="center"\n        prop="beginTime"\n        :formatter="dateFormatter"\n        width="180px"\n      />\n      <el-table-column\n        label="结束请求时间"\n        align="center"\n        prop="endTime"\n        :formatter="dateFormatter"\n        width="180px"\n      />\n      <el-table-column label="执行时长" align="center" prop="duration" />\n      <el-table-column label="结果码" align="center" prop="resultCode" />\n      <el-table-column label="结果提示" align="center" prop="resultMsg" />\n      <el-table-column\n        label="创建时间"\n        align="center"\n        prop="createTime"\n        :formatter="dateFormatter"\n        width="180px"\n      />\n      <el-table-column label="操作" align="center" min-width="120px">\n        <template #default="scope">\n          <el-button\n            link\n            type="primary"\n            @click="openForm(\'update\', scope.row.id)"\n            v-hasPermi="[\'infra:api-access-log:update\']"\n          >\n            编辑\n          </el-button>\n          <el-button\n            link\n            type="danger"\n            @click="handleDelete(scope.row.id)"\n            v-hasPermi="[\'infra:api-access-log:delete\']"\n          >\n            删除\n          </el-button>\n        </template>\n      </el-table-column>\n    </el-table>\n    <!-- 分页 -->\n    <Pagination\n      :total="total"\n      v-model:page="queryParams.pageNo"\n      v-model:limit="queryParams.pageSize"\n      @pagination="getList"\n    />\n  </ContentWrap>\n\n  <!-- 表单弹窗：添加/修改 -->\n  <ApiAccessLogForm ref="formRef" @success="getList" />\n</template>\n\n<script setup lang="ts">\nimport { dateFormatter } from \'@/utils/formatTime\'\nimport download from \'@/utils/download\'\nimport { ApiAccessLogApi, ApiAccessLogVO } from \'@/api/infra/apiaccesslog\'\nimport ApiAccessLogForm from \'./ApiAccessLogForm.vue\'\n\n/** API 访问日志 列表 */\ndefineOptions({ name: \'ApiAccessLog\' })\n\nconst message = useMessage() // 消息弹窗\nconst { t } = useI18n() // 国际化\n\nconst loading = ref(true) // 列表的加载中\nconst list = ref<ApiAccessLogVO[]>([]) // 列表的数据\nconst total = ref(0) // 列表的总页数\nconst queryParams = reactive({\n  pageNo: 1,\n  pageSize: 10,\n  traceId: undefined,\n  userId: undefined,\n  userType: undefined,\n  applicationName: undefined,\n  requestMethod: undefined,\n  requestUrl: undefined,\n  requestParams: undefined,\n  responseBody: undefined,\n  userIp: undefined,\n  userAgent: undefined,\n  operateModule: undefined,\n  operateName: undefined,\n  operateType: undefined,\n  beginTime: [],\n  endTime: [],\n  duration: undefined,\n  resultCode: undefined,\n  resultMsg: undefined,\n  createTime: []\n})\nconst queryFormRef = ref() // 搜索的表单\nconst exportLoading = ref(false) // 导出的加载中\n\n/** 查询列表 */\nconst getList = async () => {\n  loading.value = true\n  try {\n    const data = await ApiAccessLogApi.getApiAccessLogPage(queryParams)\n    list.value = data.list\n    total.value = data.total\n  } finally {\n    loading.value = false\n  }\n}\n\n/** 搜索按钮操作 */\nconst handleQuery = () => {\n  queryParams.pageNo = 1\n  getList()\n}\n\n/** 重置按钮操作 */\nconst resetQuery = () => {\n  queryFormRef.value.resetFields()\n  handleQuery()\n}\n\n/** 添加/修改操作 */\nconst formRef = ref()\nconst openForm = (type: string, id?: number) => {\n  formRef.value.open(type, id)\n}\n\n/** 删除按钮操作 */\nconst handleDelete = async (id: number) => {\n  try {\n    // 删除的二次确认\n    await message.delConfirm()\n    // 发起删除\n    await ApiAccessLogApi.deleteApiAccessLog(id)\n    message.success(t(\'common.delSuccess\'))\n    // 刷新列表\n    await getList()\n  } catch {}\n}\n\n/** 导出按钮操作 */\nconst handleExport = async () => {\n  try {\n    // 导出的二次确认\n    await message.exportConfirm()\n    // 发起导出\n    exportLoading.value = true\n    const data = await ApiAccessLogApi.exportApiAccessLog(queryParams)\n    download.excel(data, \'API 访问日志.xls\')\n  } catch {\n  } finally {\n    exportLoading.value = false\n  }\n}\n\n/** 初始化 **/\nonMounted(() => {\n  getList()\n})\n</script>',
    },
    {
      filePath:
        "yudao-ui-admin-vue3/src/views/infra/apiaccesslog/ApiAccessLogForm.vue",
      code: '<template>\n  <Dialog :title="dialogTitle" v-model="dialogVisible">\n    <el-form\n      ref="formRef"\n      :model="formData"\n      :rules="formRules"\n      label-width="100px"\n      v-loading="formLoading"\n    >\n      <el-form-item label="链路追踪编号" prop="traceId">\n        <el-input v-model="formData.traceId" placeholder="请输入链路追踪编号" />\n      </el-form-item>\n      <el-form-item label="用户编号" prop="userId">\n        <el-input v-model="formData.userId" placeholder="请输入用户编号" />\n      </el-form-item>\n      <el-form-item label="用户类型" prop="userType">\n        <el-select v-model="formData.userType" placeholder="请选择用户类型">\n          <el-option label="请选择字典生成" value="" />\n        </el-select>\n      </el-form-item>\n      <el-form-item label="应用名" prop="applicationName">\n        <el-input v-model="formData.applicationName" placeholder="请输入应用名" />\n      </el-form-item>\n      <el-form-item label="请求方法名" prop="requestMethod">\n        <el-input v-model="formData.requestMethod" placeholder="请输入请求方法名" />\n      </el-form-item>\n      <el-form-item label="请求地址" prop="requestUrl">\n        <el-input v-model="formData.requestUrl" placeholder="请输入请求地址" />\n      </el-form-item>\n      <el-form-item label="请求参数" prop="requestParams">\n        <el-input v-model="formData.requestParams" placeholder="请输入请求参数" />\n      </el-form-item>\n      <el-form-item label="响应结果" prop="responseBody">\n        <el-input v-model="formData.responseBody" placeholder="请输入响应结果" />\n      </el-form-item>\n      <el-form-item label="用户 IP" prop="userIp">\n        <el-input v-model="formData.userIp" placeholder="请输入用户 IP" />\n      </el-form-item>\n      <el-form-item label="浏览器 UA" prop="userAgent">\n        <el-input v-model="formData.userAgent" placeholder="请输入浏览器 UA" />\n      </el-form-item>\n      <el-form-item label="操作模块" prop="operateModule">\n        <el-input v-model="formData.operateModule" placeholder="请输入操作模块" />\n      </el-form-item>\n      <el-form-item label="操作名" prop="operateName">\n        <el-input v-model="formData.operateName" placeholder="请输入操作名" />\n      </el-form-item>\n      <el-form-item label="操作分类" prop="operateType">\n        <el-select v-model="formData.operateType" placeholder="请选择操作分类">\n          <el-option label="请选择字典生成" value="" />\n        </el-select>\n      </el-form-item>\n      <el-form-item label="开始请求时间" prop="beginTime">\n        <el-date-picker\n          v-model="formData.beginTime"\n          type="date"\n          value-format="x"\n          placeholder="选择开始请求时间"\n        />\n      </el-form-item>\n      <el-form-item label="结束请求时间" prop="endTime">\n        <el-date-picker\n          v-model="formData.endTime"\n          type="date"\n          value-format="x"\n          placeholder="选择结束请求时间"\n        />\n      </el-form-item>\n      <el-form-item label="执行时长" prop="duration">\n        <el-input v-model="formData.duration" placeholder="请输入执行时长" />\n      </el-form-item>\n      <el-form-item label="结果码" prop="resultCode">\n        <el-input v-model="formData.resultCode" placeholder="请输入结果码" />\n      </el-form-item>\n      <el-form-item label="结果提示" prop="resultMsg">\n        <el-input v-model="formData.resultMsg" placeholder="请输入结果提示" />\n      </el-form-item>\n    </el-form>\n    <template #footer>\n      <el-button @click="submitForm" type="primary" :disabled="formLoading">确 定</el-button>\n      <el-button @click="dialogVisible = false">取 消</el-button>\n    </template>\n  </Dialog>\n</template>\n<script setup lang="ts">\nimport { ApiAccessLogApi, ApiAccessLogVO } from \'@/api/infra/apiaccesslog\'\n\n/** API 访问日志 表单 */\ndefineOptions({ name: \'ApiAccessLogForm\' })\n\nconst { t } = useI18n() // 国际化\nconst message = useMessage() // 消息弹窗\n\nconst dialogVisible = ref(false) // 弹窗的是否展示\nconst dialogTitle = ref(\'\') // 弹窗的标题\nconst formLoading = ref(false) // 表单的加载中：1）修改时的数据加载；2）提交的按钮禁用\nconst formType = ref(\'\') // 表单的类型：create - 新增；update - 修改\nconst formData = ref({\n  id: undefined,\n  traceId: undefined,\n  userId: undefined,\n  userType: undefined,\n  applicationName: undefined,\n  requestMethod: undefined,\n  requestUrl: undefined,\n  requestParams: undefined,\n  responseBody: undefined,\n  userIp: undefined,\n  userAgent: undefined,\n  operateModule: undefined,\n  operateName: undefined,\n  operateType: undefined,\n  beginTime: undefined,\n  endTime: undefined,\n  duration: undefined,\n  resultCode: undefined,\n  resultMsg: undefined\n})\nconst formRules = reactive({\n  traceId: [{ required: true, message: \'链路追踪编号不能为空\', trigger: \'blur\' }],\n  userId: [{ required: true, message: \'用户编号不能为空\', trigger: \'blur\' }],\n  userType: [{ required: true, message: \'用户类型不能为空\', trigger: \'change\' }],\n  applicationName: [{ required: true, message: \'应用名不能为空\', trigger: \'blur\' }],\n  requestMethod: [{ required: true, message: \'请求方法名不能为空\', trigger: \'blur\' }],\n  requestUrl: [{ required: true, message: \'请求地址不能为空\', trigger: \'blur\' }],\n  userIp: [{ required: true, message: \'用户 IP不能为空\', trigger: \'blur\' }],\n  userAgent: [{ required: true, message: \'浏览器 UA不能为空\', trigger: \'blur\' }],\n  beginTime: [{ required: true, message: \'开始请求时间不能为空\', trigger: \'blur\' }],\n  endTime: [{ required: true, message: \'结束请求时间不能为空\', trigger: \'blur\' }],\n  duration: [{ required: true, message: \'执行时长不能为空\', trigger: \'blur\' }],\n  resultCode: [{ required: true, message: \'结果码不能为空\', trigger: \'blur\' }]\n})\nconst formRef = ref() // 表单 Ref\n\n/** 打开弹窗 */\nconst open = async (type: string, id?: number) => {\n  dialogVisible.value = true\n  dialogTitle.value = t(\'action.\' + type)\n  formType.value = type\n  resetForm()\n  // 修改时，设置数据\n  if (id) {\n    formLoading.value = true\n    try {\n      formData.value = await ApiAccessLogApi.getApiAccessLog(id)\n    } finally {\n      formLoading.value = false\n    }\n  }\n}\ndefineExpose({ open }) // 提供 open 方法，用于打开弹窗\n\n/** 提交表单 */\nconst emit = defineEmits([\'success\']) // 定义 success 事件，用于操作成功后的回调\nconst submitForm = async () => {\n  // 校验表单\n  await formRef.value.validate()\n  // 提交请求\n  formLoading.value = true\n  try {\n    const data = formData.value as unknown as ApiAccessLogVO\n    if (formType.value === \'create\') {\n      await ApiAccessLogApi.createApiAccessLog(data)\n      message.success(t(\'common.createSuccess\'))\n    } else {\n      await ApiAccessLogApi.updateApiAccessLog(data)\n      message.success(t(\'common.updateSuccess\'))\n    }\n    dialogVisible.value = false\n    // 发送操作成功的事件\n    emit(\'success\')\n  } finally {\n    formLoading.value = false\n  }\n}\n\n/** 重置表单 */\nconst resetForm = () => {\n  formData.value = {\n    id: undefined,\n    traceId: undefined,\n    userId: undefined,\n    userType: undefined,\n    applicationName: undefined,\n    requestMethod: undefined,\n    requestUrl: undefined,\n    requestParams: undefined,\n    responseBody: undefined,\n    userIp: undefined,\n    userAgent: undefined,\n    operateModule: undefined,\n    operateName: undefined,\n    operateType: undefined,\n    beginTime: undefined,\n    endTime: undefined,\n    duration: undefined,\n    resultCode: undefined,\n    resultMsg: undefined\n  }\n  formRef.value?.resetFields()\n}\n</script>',
    },
    {
      filePath: "yudao-ui-admin-vue3/src/api/infra/apiaccesslog/index.ts",
      code: "import request from '@/config/axios'\n\n// API 访问日志 VO\nexport interface ApiAccessLogVO {\n  id: number // 日志主键\n  traceId: string // 链路追踪编号\n  userId: number // 用户编号\n  userType: number // 用户类型\n  applicationName: string // 应用名\n  requestMethod: string // 请求方法名\n  requestUrl: string // 请求地址\n  requestParams: string // 请求参数\n  responseBody: string // 响应结果\n  userIp: string // 用户 IP\n  userAgent: string // 浏览器 UA\n  operateModule: string // 操作模块\n  operateName: string // 操作名\n  operateType: number // 操作分类\n  beginTime: Date // 开始请求时间\n  endTime: Date // 结束请求时间\n  duration: number // 执行时长\n  resultCode: number // 结果码\n  resultMsg: string // 结果提示\n}\n\n// API 访问日志 API\nexport const ApiAccessLogApi = {\n  // 查询API 访问日志分页\n  getApiAccessLogPage: async (params: any) => {\n    return await request.get({ url: `/infra/api-access-log/page`, params })\n  },\n\n  // 查询API 访问日志详情\n  getApiAccessLog: async (id: number) => {\n    return await request.get({ url: `/infra/api-access-log/get?id=` + id })\n  },\n\n  // 新增API 访问日志\n  createApiAccessLog: async (data: ApiAccessLogVO) => {\n    return await request.post({ url: `/infra/api-access-log/create`, data })\n  },\n\n  // 修改API 访问日志\n  updateApiAccessLog: async (data: ApiAccessLogVO) => {\n    return await request.put({ url: `/infra/api-access-log/update`, data })\n  },\n\n  // 删除API 访问日志\n  deleteApiAccessLog: async (id: number) => {\n    return await request.delete({ url: `/infra/api-access-log/delete?id=` + id })\n  },\n\n  // 导出API 访问日志 Excel\n  exportApiAccessLog: async (params) => {\n    return await request.download({ url: `/infra/api-access-log/export-excel`, params })\n  }\n}",
    },
  ];

  return <CodeViewer data={data} />;
};
