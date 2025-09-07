/*
 * @Author: hijiangtao (hijiangtao@gmail.com) 
 * @Date: 2019-01-23 16:51:30 
 * @Desc: Tools
 * @Last Modified by: hijiangtao (hijiangtao@gmail.com)
 * @Last Modified time: 2019-02-23 16:23:09
 */

import MapboxLanguage from '@mapbox/mapbox-gl-language';

/**
 * 图层添加中文支持
 * @param {*} map 
 */
const addMapControl = (map) => {
  map.setLayoutProperty('country-label-lg', 'text-field', ['get', 'name_zh']);
  map.addControl(new MapboxLanguage({
    defaultLanguage: 'zh',
  }));
}

const preventDefault = evt => evt.preventDefault();

export {
  addMapControl,
  preventDefault,
}