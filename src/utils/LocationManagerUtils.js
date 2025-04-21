import AMapLoader from '@amap/amap-jsapi-loader'

const locationOption = {
  enableHighAccuracy: true,//是否使用高精度定位，默认:true
  timeout: 10000,          //超过10秒后停止定位，默认：无穷大
  maximumAge: 0,           //定位结果缓存0毫秒，默认：0
  convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
  showButton: true,        //显示定位按钮，默认：true
  buttonPosition: 'LB',    //定位按钮停靠位置，默认：'LB'，左下角
  buttonOffset: null,      //定位按钮与设置的停靠位置的偏移量，默认：new AMap.Pixel(10,20)
  showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
  showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
  panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
  zoomToAccuracy: true,    //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
  mapKey: '',
  mapSecurityCode: ''
}

/**
 * todo 加载高德地图实例
 * @param plugins
 * @return {Promise<any>}
 */
function loadMap(plugins = []) {
  window._AMapSecurityConfig = {
    securityJsCode: locationOption.mapSecurityCode
  }
  return AMapLoader.load({
    'key': locationOption.mapKey,
    'version': '2.0',
    'plugins': plugins
  })
}
function getMap(container, option) {
  return new AMap.Map(container, option);
}

function getPolygonEditor(map, polygon) {
  return new AMap.PolygonEditor(map, polygon);
}

/**
 * todo 获取当前定位
 */
function getCurrentLocation(geocoderListener) {
  loadMap(['AMap.Geolocation'])
    .then(function () {
      new AMap.Geolocation(locationOption)
        .getCurrentPosition(function (status, result) {
          if (result.status === 0 && result.info === 'SUCCESS') {
            getGeocoder(result.position.lng, result.position.lat, geocoderListener)
          } else {
            console.error('get location status：', result)
          }
        })
    }).catch(error => {
      console.error('get location error：', error)
    })
}

/**
 * todo 获取当前城市定位
 * @param currentCityLocationListener
 */
function getCurrentCityLocation(currentCityLocationListener) {
  loadMap(['AMap.CitySearch'])
    .then(function () {
      const citySearch = new AMap.CitySearch()
      citySearch.getLocalCity(function (status, result) {
        if (status === 'complete' && result.info === 'OK') {
          // 查询成功，result即为当前所在城市信息
          currentCityLocationListener(result)
        }
      })
    })
}

/**
 * todo 获取高德逆地理位置编码
 * @param city
 * @param lng
 * @param lat
 * @param geocoderListener
 */
function getGeocoder(lng, lat, geocoderListener, city = '') {
  const pos = [lng, lat]
  loadMap(['AMap.Geocoder'])
    .then(function () {
      new AMap.Geocoder({
        // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
        city: city
      }).getAddress(pos, function (status, result) {
        if (result.info === 'OK') {
          geocoderListener(result)
        } else {
          console.error('get geocoder info status ', result)
        }
      })
    }).catch(error => {
      console.error('get geocoder info error ', error)
    })
}

/**
 * todo 获取城市天气信息
 * @param city
 * @param weatherLiveListener
 */
function getWeatherLive(city, weatherLiveListener) {
  //加载天气查询插件
  loadMap(['AMap.Weather'])
    .then(function () {
      // 创建天气查询实例
      const weather = new AMap.Weather()
      // 执行实时天气信息查询
      weather.getLive(city, function (err, data) {
        weatherLiveListener(data)
      })
    })
}

/**
 * todo 获取城市预报天气信息
 * @param city
 * @param weatherForecastListener
 */
function getWeatherForecast(city, weatherForecastListener) {
  loadMap(['AMap.Weather'])
    .then(function () {
      // 创建天气查询实例
      const weather = new AMap.Weather()
      //执行实时天气信息查询
      weather.getForecast(city, function (err, data) {
        weatherForecastListener(data)
      })
    })
}

/**
 * 查询周边信息根据（ 经纬度 ）
 * @param {*} lat 纬度
 * @param {*} lng 经度
 * @param {*} searchListener 结果回调
 * @param {*} options 配置选项
 */
function findPoiSearchByLatitude(lat, lng, searchListener, options = {}) {
  loadMap(['AMap.PlaceSearch'])
    .then(function () {
      var PlaceSearch = new AMap.PlaceSearch(options)
      PlaceSearch.searchNearBy('', [lng, lat], 300, function (status, result) {
        if (status == 'complete') {
          searchListener(result)
        } else {
          searchListener({
            info: 'no_data',
            poiList: {
              pois: [],
              count: 0,
              pageIndex: 1,
              pageSize: 10
            }
          })
        }
      })
    })
}

/**
 * 查询周边信息根据（ 关键字 ）
 * @param {*} lat 纬度
 * @param {*} lng 经度
 * @param {*} searchListener 结果回调
 * @param {*} options 配置选项
 */
function findPoiSearchByKeyword(keyword, searchListener, options = {}) {
  loadMap(['AMap.PlaceSearch', 'AMap.AutoComplete'])
    .then(function () {
      var placeSearch = new AMap.PlaceSearch(options);
      placeSearch.search(keyword, function (status, result) {
        if (status == 'complete') {
          searchListener(result)
        } else {
          searchListener({
            info: 'no_data',
            poiList: {
              pois: [],
              count: 0,
              pageIndex: 1,
              pageSize: 10
            }
          })
        }

      });
    })
}

/**
 * 路线规划
 * @param {*} container 容器id
 * @param {*} startLat  起始经度
 * @param {*} startLng  起始维度
 * @param {*} endLat 终点经度
 * @param {*} endLng  终点维度
 * @param {*} mapOption  地图Map属性
 * @param {*} drivingOption 设置路线规划属性
 * @param {*} waypoints 途经点
 * @param {*} drivingSearchListener 路线结果回调
 *                          
 */
function getDrivingSearch(container, startLat, startLng, endLat, endLng, mapOption, drivingOption, waypoints, drivingSearchListener) {
  loadMap(['AMap.Driving'])
    .then(function () {
      var map = getMap(container, mapOption);
      // //构造路线导航类
      var driving = new AMap.Driving({
        // AMap.Map对象, 展现结果的地图实例。当指定此参数后，搜索结果的标注、线路等均会自动添加到此地图上。可选
        map: map,
        // 驾车路线规划策略 1.最快捷模式:AMap.DrivingPolicy.LEAST_TIME
        //               2.最经济模式:AMap.DrivingPolicy.LEAST_FEE
        //               3.最短距离模式:AMap.DrivingPolicy.LEAST_DISTANCE
        //               4.考虑实时路况:AMap.DrivingPolicy.REAL_TRAFFIC
        policy: drivingOption.policy,
        // 默认值：base，返回基本地址信息 当取值为：all，返回DriveStep基本信息+DriveStep详细信息
        extensions: drivingOption.extensions,
        // 默认为0，表示可以使用轮渡，为1的时候表示不可以使用轮渡
        ferry: drivingOption.ferry,
        // 结果列表的HTML容器id或容器元素，提供此参数后，结果列表将在此容器中进行展示。可选
        panel: drivingOption.panel,
        // 设置隐藏路径规划的起始点图标，设置为true：隐藏图标；设置false：显示图标        默认值为：false
        hideMarkers: drivingOption.hideMarkers,
        // 设置是否显示实时路况信息，默认设置为true。显示绿色代表畅通，黄色代表轻微拥堵，红色代表比较拥堵，灰色表示无路况信息。
        showTraffic: drivingOption.showTraffic,
        // 车牌省份的汉字缩写，用于判断是否限行，与number属性组合使用，可选。例如：京
        province: drivingOption.province,
        // 除省份之外车牌的字母和数字，用于判断限行相关，与province属性组合使用，可选。例如:NH1N11
        number: drivingOption.number,
        // 使用map属性时，绘制的规划线路是否显示描边。缺省为true
        isOutlineL: drivingOption.isOutline,
        // 使用map属性时，绘制的规划线路的描边颜色。缺省为'white'
        outlineColor: drivingOption.outlineColor,
        // 用于控制在路径规划结束后，是否自动调整地图视野使绘制的路线处于视口的可见范围
        autoFitView: drivingOption.autoFitView
      });

      // 根据起终点经纬度规划驾车导航路线
      driving.search(new AMap.LngLat(startLng, startLat), new AMap.LngLat(endLng, endLat),
        {
          // 途经点通过opts设定，最多支持16个途径点，new AMap.LngLat(116.379028, 39.885042)
          waypoints: waypoints
        },
        function (status, result) {
          drivingSearchListener(result, map)
        });
    })
}


/**
 * 渲染地图组件
 * @param {*} container 
 * @param {*} option 
 * @param {*} mapListener 
 */
function renderMap(container, mapListener, option = { zoom: 14 }) {
  loadMap()
    .then(succeed => {
      var map = getMap(container, option);
      mapListener(map);
    })
}

/**
 * 构建多边形实例
 * @param {*} path 
 * @returns 
 */
function renderPolygon(path = [], strokeColor = '#FF33FF', fillColor = '#1791fc', strokeWeight = 6) {
  return new AMap.Polygon({
    // 多边形轮廓线的节点坐标数组。 支持 单个普通多边形({Array })，单个带孔多边形({Array<Array >})，多个带孔多边形({Array<Array<Array >>})
    path: path,
    // 线条颜色，使用16进制颜色代码赋值。默认值为#00D3FC
    strokeColor: strokeColor,
    // 轮廓线宽度
    strokeWeight: strokeWeight,
    // 轮廓线透明度，取值范围 [0,1] ，0表示完全透明，1表示不透明。默认为0.9
    strokeOpacity: 0.2,
    // 多边形填充透明度，取值范围 [0,1] ，0表示完全透明，1表示不透明。默认为0.5
    fillOpacity: 0.4,
    // 多边形填充颜色，使用16进制颜色代码赋值，如：#00B2D5
    fillColor: fillColor,
    // 多边形覆盖物的叠加顺序。地图上存在多个多边形覆盖物叠加时，通过该属性使级别较高的多边形覆盖物在上层显示
    zIndex: 50,
    // 是否将覆盖物的鼠标或touch等事件冒泡到地图上
    bubble: true,
  })
}

/**
 * 构建多边形编辑器实例
 * 常用函数：
 * open()  // 开始编辑对象
 * setAdsorbPolygons(list) // 设置吸附多边形
 * clearAdsorbPolygons() // 清空所有的吸附多边形
 * addAdsorbPolygons(list) // 添加吸附多边形
 * removeAdsorbPolygons(list) // 删除吸附多边形
 * close() // 停止编辑对象
 * 常用事件：
 * addnode // 增加一个节点时触发此事件 例如
 * @param {*} map 
 * @param {*} polygon 
 * @returns 
 */
function renderPolygonEditor(map, polygonEditorListener, polygon = null) {
  loadMap(['AMap.PolygonEditor'])
    .then(succeed => {
      var polygonEditor = getPolygonEditor(map, polygon)
      polygonEditorListener(polygonEditor)
    })
}



/**
 * 添加覆盖物坐标点
 * @param {array} postion 坐标点 [116.49, 39.9]
 * @param {*} icon 覆盖物图标 默认：https://webapi.amap.com/theme/v1.3/markers/n/mark_r.png
 * @returns 
 */
function appendMarker(postion = [], icon = 'https://webapi.amap.com/theme/v1.3/markers/n/mark_r.png') {
  return new AMap.Marker({
    icon: icon,
    position: postion,
  });
}

/**
 * 添加地图缩放控制器
 * @param {*} map 
 */
function appendScaleControl(map) {
  loadMap(['AMap.ToolBar'])
    .then(() => {
      // 在图面添加工具条控件, 工具条控件只有缩放功能
      map.addControl(new AMap.ToolBar());
    });
}

/**
 * 地图事件（ 移动结束 ）
 * @param {*} map 
 * @param {*} fun 
 */
function appendMoveend(map, fun) {
  map.on('moveend', fun);
}

/**
 * 地图事件（ 移动中 ）
 * @param {*} map 
 * @param {*} fun 
 */
function appendMove(map, fun) {
  map.on('mapmove', fun)
}

/**
 * 地图事件（ 移动准备 ）
 * @param {*} map 
 * @param {*} fun 
 */
function appendStart(map, fun) {
  map.on('movestart', fun)
}

/**
 * 多边形编辑器事件（ 添加节点 ）
 * @param {*} polygonEditor 
 * @param {*} fun 
 */
function appendPolygoNode(polygonEditor, fun) {
  polygonEditor.on('addnode', function (event) {
    fun(event)
  })
}


export default {
  locationOption,
  getCurrentCityLocation,
  getCurrentLocation,
  getGeocoder,
  getWeatherLive,
  getWeatherForecast,
  getDrivingSearch,
  renderMap,
  renderPolygon,
  renderPolygonEditor,
  appendMarker,
  appendScaleControl,
  appendMoveend,
  appendMove,
  appendStart,
  appendPolygoNode,
  findPoiSearchByLatitude,
  findPoiSearchByKeyword
}
