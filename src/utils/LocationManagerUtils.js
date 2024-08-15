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

/**
 * todo 获取当前定位
 */
function getCurrentLocation(geocoderListener) {
  loadMap(['AMap.Geolocation'])
    .then(function () {
      new AMap.Geolocation(locationOption)
        .getCurrentPosition(function (status, result) {
          if (result.status === 0 && result.info === 'SUCCESS') {
            getGeocoder('', result.position.lng, result.position.lat, geocoderListener)
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
function getGeocoder(city, lng, lat, geocoderListener) {
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
 * todo 周边搜索（ 关键字 ）
 * @param searchOption
 *        city:''                 兴趣点城市 可选值：城市名（中文或中文全拼）、citycode、adcode默认值：“全国”
 *        citylimit:''            是否强制限制在设置的城市内搜索，默认值为：false true：强制限制设定城市，false：不强制限制设定城市
 *        children:''             是否按照层级展示子POI数据,默认0 children=1，展示子节点POI数据，children=0，不展示子节点数据
 *        type:''                 兴趣点类别，多个类别用“|”分割，如“餐饮|酒店|电影院”
 *                                POI搜索类型共分为以下20种：
 *                                汽车服务|汽车销售|汽车维修|摩托车服务|餐饮服务|购物服务|生活服务|体育休闲服务|
 *                                医疗保健服务|住宿服务|风景名胜|商务住宅|政府机构及社会团体|科教文化服务|
 *                                交通设施服务|金融保险服务|公司企业|道路附属设施|地名地址信息|公共设施
 *                                默认值：餐饮服务、商务住宅、生活服务
 *        lang:''                 检索语言类型 可选值：zh_cn：中文简体，en：英文 默认为: zh_cn：中文简体
 *        pageSize:''             单页显示结果条数 默认值：10 取值范围：1-50，超出取值范围按最大值返回
 *        pageIndex:''            页码。（如pageIndex为2，pageSize为10，那么显示的应是第11-20条返回结果）默认值：1 取值范围：1-100，超过实际页数不返回poi
 *        extensions:''           此项默认值：base，返回基本地址信息 取值：all，返回基本+详细信息
 *        map:''                  AMap.Map对象, 展现结果的地图实例。当指定此参数后，搜索结果的标注、线路等均会自动添加到此地图上。可选值
 *        panel:''                结果列表的HTML容器id或容器元素，提供此参数后，结果列表将在此容器中进行展示。可选值
 *        showCover:''            在使用map属性时，是否在地图上显示周边搜索的圆或者范围搜索的多边形，默认为true
 *        renderStyle:''          如使用了map或panel属性，renderStyle可以用来设定绘制的UI风格，缺省为'newpc'
 *                                可选值:'newpc'或'default'，'newpc'为带图片展示的新样式，'default'为原有简单样式。
 *        autoFitView:''          用于控制在搜索结束后，是否自动调整地图视野使绘制的Marker点都处于视口的可见范围
 *        keyword:''              关键字
 *
 * @param searchListener
 */
function getPoiSearch(searchOption, searchListener) {
  loadMap(['AMap.PlaceSearch'])
    .then(function () {
      new AMap.PlaceSearch(searchOption)
        .search(searchOption.keyword, function (status, result) {
          searchListener(result)
        })
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
function renderMap(container, mapListener, option = {}) {
  loadMap()
    .then(succeed => {
      var map = getMap(container, option = {} ? {
        viewMode: '2D', //默认使用 2D 模式
        zoom: 14, //地图级别
      } : option);
      mapListener(map);
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

export default {
  locationOption,
  getCurrentCityLocation,
  getCurrentLocation,
  getWeatherLive,
  getWeatherForecast,
  getPoiSearch,
  getDrivingSearch,
  renderMap,
  appendMarker
}
