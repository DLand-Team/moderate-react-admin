import { useFlatInject, useGreatAsync } from "@/common/hooks";
import type { Article } from "@/services/stores/articleStore/articleStore.model";
import { Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useEffect } from "react";
import styles from "./articlePage.module.scss";
import ModalForm from "./components/modalForm/modalForm";


const columns: ColumnsType<Article> = [
  {
    title: "编号",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "文章名称",
    dataIndex: "title",
    key: "title",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "副标题",
    dataIndex: "subTitle",
    key: "subTitle",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "操作",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <a>修改</a>
      </Space>
    ),
  },
];

const ArticlePage = () => {
  const [articleStore] = useFlatInject("articleStore");
  const {
    pageNum,
    pageSize,
    total,
    articleList,
    addArticle,
    createArticleList,
  } = articleStore;
  const { loading: loading1, run: createArticleListG } = useGreatAsync(
    createArticleList,
    {
      auto: true,
      debounceTime: 1000,
    }
  );
  const { loading: loading2, run: addArticleG } = useGreatAsync(addArticle, {
    auto: false,
    single: true,
  });
  const handlePageChange = async (pageNum = 1, pageSize) => {
    await createArticleListG({
      pageNum: pageNum,
      pageSize: pageSize,
    });
  };
  const handleUpload = (values: any) => {
    values.cover = values.cover.join(",");
    addArticleG(values).then((res) => {});
  };
  useEffect(() => {
    handlePageChange(pageNum, pageSize);
  }, []);
  return (
    <div className={styles.content}>
      {/* <SearchForm /> */}
      <div className={styles.operate_board}>
        <ModalForm handleUpload={handleUpload} />
      </div>
      <Table
        rowKey={(record) => {
          return record.id;
        }}
        loading={loading1 && loading2}
        pagination={{
          pageSize,
          current: pageNum,
          total,
          onChange(page, pageSize) {
            console.log(page, pageSize);
            handlePageChange(page, pageSize);
          },
        }}
        columns={columns}
        dataSource={articleList}
      />
    </div>
  );
};

export default ArticlePage;
