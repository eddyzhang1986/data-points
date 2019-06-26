import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    // 默认页面配置
    page: {
      width: 1920,
      height: 1080,
      scale: 1,
      scaleType: 1,
      gutter: 8,
      background: {
        color: '#0e2a43',
        image: '',
        gradientType: 1,
        colorStart: '#000000',
        colorStop: '#000000',
      },
      thumbnail: ''
    },
    // 画布缩放比例
    pageScale: 0,
    // 参考线
    guideLine: false,
    // 画布组件
    renderComponentList: [],
  },
  getters: {
    // 选中组件
    selectedComponentList: state => {
      return state.renderComponentList.filter(n => n.isActive)
    },
  },
  mutations: {
    setPageScale: (state, scale) => {
      state.pageScale = scale
    },
    // 设置页面配置
    setPage: (state, pageSetting) => {
      Object.assign(state.page, pageSetting)
    },
    // 设置背景
    setBackground: (state, background) => {
      Object.assign(state.page.background, background)
    },
    // 添加组件
    insertComponent: (state, component) => {
      if(component.enabled) {
        state.renderComponentList.push({
          componentId: component.id,
          id: _.uniqueId(),
          name: component.name,
          thumbnail: component.thumbnail,
          hover: false,
          checked: false,
          config: JSON.parse(JSON.stringify(component.config)),
          data: JSON.parse(JSON.stringify(component.data)),
          interaction: JSON.parse(JSON.stringify(component.interaction))
        })
      }
    }
  }
});

export default store;

