import * as dat from 'dat.gui';

/**
 * 数组转 JSON
 * @param {*} obj 
 */
const arraytoJSON = (obj) => obj.reduce((accumulator, currentValue) => {
  return {
    ...accumulator,
    [currentValue.name]: currentValue.value,
  };
}, {});

/**
 * 数组转遍历留存特定属性的数组
 * @param {*} obj 
 * @param {*} propName 
 */
const arrayPropMap = (obj, propName = 'value') => obj.map((e) => e[propName]);

/**
 * 判断 Bool 值，兼容字符串表达
 * @param {*} val 
 */
// eslint-disable-next-line eqeqeq
const BoolJud = (val) => val == 'true';

/**
 * 生成 menu 后续需要的入参
 * @param {*} configs 
 * @param {*} convertType 
 */
const getTypesArrayFromConfig = (configs, convertType) => {
  let res = [];
  switch (convertType) {
    case 'json':
      res.push(arraytoJSON(configs));
      break;
    case 'array':
      res.push(arrayPropMap(configs));
      break;
    case 'spread':
      res = [...configs];
      break; 
    case 'none':
    default:
      break;
  }

  return res;
}

const Menu = (props) => {
  const { rootID, initData, configMap } = props;

  const gui = new dat.GUI({
    autoPlace: false,
  });

  // folder 遍历
  configMap.map(({ title, content }) => {
    const folder = gui.addFolder(title);
    let needOpen = false;

    // 配置单项遍历
    content.map(({
      property,
      name,
      setter,
      configs,
      convertType,
      stateType,
    }) => {
      const isColor = convertType === 'color';
      needOpen = !isColor;
      const foldParams = [isColor ? 
        initData.colorRange : initData, property];
      foldParams.push(...getTypesArrayFromConfig(configs, convertType));

      const controller = isColor ? 
        folder.addColor(...foldParams).name(name) : folder.add(...foldParams).name(name);

      let Type = String;
      switch (stateType) {
        case 'number':
          Type = Number;
          break;
        case 'bool':
          Type = BoolJud;
          break;
        case 'string':
          Type = String;
          break;
        default:
          Type = val => val
          break;
      }

      // 事件
      controller.onFinishChange((val) => {
        setter(Type(val));
      });

      return null;
    });

    if (needOpen) folder.open();

    return null;
  });

  const customContainer = document.getElementById(rootID);
  customContainer.appendChild(gui.domElement);

  return null;
}

export default Menu;