<template>
  <div :class="prefix">
    <i-layout>
      <i-header :class="prefix + '__header'">
        <i-menu mode="horizontal" theme="primary" active-name="1">
          <div :class="logoScale" @click="$_onClickLogoNavTo">
            <img :src="logoSrc" :class="imgScale" />
          </div>
          <i-icon
            :class="rotateIcon"
            type="md-menu"
            size="24"
            @click.native="collapsedSider"
          ></i-icon>
          <div :class="prefix + '__nav'">
            <i-menu-item name="1"> <i-icon type="ios-navigate"></i-icon>Item 1 </i-menu-item>
            <i-menu-item name="2"> <i-icon type="ios-keypad"></i-icon>Item 2 </i-menu-item>
            <i-menu-item name="3"> <i-icon type="ios-analytics"></i-icon>Item 3 </i-menu-item>
            <i-menu-item name="4"> <i-icon type="ios-paper"></i-icon>Item 4 </i-menu-item>
          </div>
        </i-menu>
        <div :class="prefix + '__slot'"></div>
        <div :class="prefix + '__right'">
          <div :class="[prefix + '__right__install', 'cursor-pointer']">
            <i-icon type="ios-link" size="20"></i-icon>
            <span>未安装</span>
          </div>
          <div :class="[prefix + '__right__user', 'm-2']">
            <i-icon type="md-contact" size="20"></i-icon>
            <i-poptip width="250" trigger="hover" placement="bottom-end">
              <span
                :class="[
                  'text-truncate',
                  'align-vertical',
                  'd-inline',
                  prefix + '__right__username'
                ]"
              >
                {{ userInfo.name }}
              </span>
              <template slot="title">
                <div class="d-flex">
                  <span class="c-gray">帐号信息</span>
                  <span class="ml-auto c-primary cursor-pointer">修改密码</span>
                </div>
              </template>
              <template slot="content">
                <span class="c-gray">敬请期待...</span>
              </template>
            </i-poptip>
          </div>
          <i-poptip width="250" trigger="hover" placement="bottom-end">
            <i-icon class="m-2" type="logo-buffer" size="20"></i-icon>
            <template slot="title">
              <div class="d-flex">
                <span class="c-gray">常用菜单</span>
                <span class="ml-auto c-primary cursor-pointer">去设置</span>
              </div>
            </template>
            <template slot="content">
              <span class="c-gray">敬请期待...</span>
            </template>
          </i-poptip>
          <i-poptip width="250" trigger="hover" placement="bottom-end">
            <i-icon class="m-2" type="md-desktop" size="20"></i-icon>
            <template slot="title">
              <div class="d-flex">
                <span class="c-gray">消息中心</span>
              </div>
            </template>
            <template slot="content">
              <span class="c-gray">敬请期待...</span>
            </template>
          </i-poptip>
          <i-poptip width="250" trigger="hover" placement="bottom-end">
            <i-icon class="m-2" type="md-notifications" size="20"></i-icon>
            <template slot="title">
              <div class="d-flex">
                <span class="c-gray">我的工作台</span>
              </div>
            </template>
            <template slot="content">
              <span class="c-gray">敬请期待...</span>
            </template>
          </i-poptip>
          <i-tooltip content="退出登录">
            <i-icon class="m-2" type="md-power" size="20"></i-icon>
          </i-tooltip>
        </div>
      </i-header>
      <i-layout>
        <i-sider
          ref="side"
          hide-trigger
          accordion
          collapsible
          breakpoint="xl"
          :collapsed-width="64"
          v-model="isCollapsed"
        >
          <i-menu
            active-name="1-2"
            theme="light"
            width="auto"
            accordion
            :open-names="['1']"
            :class="menuitemClasses"
          >
            <i-submenu name="1">
              <template slot="title">
                <i-tooltip
                  class="menu__tooltip"
                  content="内容管理"
                  placement="right"
                  :disabled="!isCollapsed"
                >
                  <i-icon type="ios-paper"></i-icon>
                  <span>内容管理</span>
                </i-tooltip>
              </template>
              <i-menu-item name="1-1">
                <i-tooltip
                  class="menu__tooltip"
                  content="Option 1"
                  placement="right"
                  :disabled="!isCollapsed"
                >
                  <i-icon type="ios-navigate"></i-icon>
                  <span>Option 1</span>
                </i-tooltip>
              </i-menu-item>
              <i-menu-item name="1-2">
                <i-tooltip
                  class="menu__tooltip"
                  content="Option 2"
                  placement="right"
                  :disabled="!isCollapsed"
                >
                  <i-icon type="ios-search"></i-icon>
                  <span>Option 2</span>
                </i-tooltip>
              </i-menu-item>
              <i-menu-item name="1-3">
                <i-tooltip
                  class="menu__tooltip"
                  content="Option 3"
                  placement="right"
                  :disabled="!isCollapsed"
                >
                  <i-icon type="ios-settings"></i-icon>
                  <span>Option 3</span>
                </i-tooltip>
              </i-menu-item>
            </i-submenu>
            <i-submenu name="2">
              <template slot="title">
                <i-tooltip
                  class="menu__tooltip"
                  content="内容管理"
                  placement="right"
                  :disabled="!isCollapsed"
                >
                  <i-icon type="ios-paper"></i-icon>
                  <span>内容管理</span>
                </i-tooltip>
              </template>
              <i-menu-item name="2-1">
                <i-tooltip
                  class="menu__tooltip"
                  content="Option 1"
                  placement="right"
                  :disabled="!isCollapsed"
                >
                  <i-icon type="ios-navigate"></i-icon>
                  <span>Option 1</span>
                </i-tooltip>
              </i-menu-item>
              <i-menu-item name="2-2">
                <i-tooltip
                  class="menu__tooltip"
                  content="Option 2"
                  placement="right"
                  :disabled="!isCollapsed"
                >
                  <i-icon type="ios-search"></i-icon>
                  <span>Option 2</span>
                </i-tooltip>
              </i-menu-item>
              <i-menu-item name="2-3">
                <i-tooltip
                  class="menu__tooltip"
                  content="Option 3"
                  placement="right"
                  :disabled="!isCollapsed"
                >
                  <i-icon type="ios-settings"></i-icon>
                  <span>Option 3</span>
                </i-tooltip>
              </i-menu-item>
            </i-submenu>
            <i-submenu name="3">
              <template slot="title">
                <i-tooltip
                  class="menu__tooltip"
                  content="内容管理"
                  placement="right"
                  :disabled="!isCollapsed"
                >
                  <i-icon type="ios-paper"></i-icon>
                  <span>内容管理</span>
                </i-tooltip>
              </template>
              <i-menu-item name="3-1">
                <i-tooltip
                  class="menu__tooltip"
                  content="Option 1"
                  placement="right"
                  :disabled="!isCollapsed"
                >
                  <i-icon type="ios-navigate"></i-icon>
                  <span>Option 1</span>
                </i-tooltip>
              </i-menu-item>
              <i-menu-item name="3-2">
                <i-tooltip
                  class="menu__tooltip"
                  content="Option 2"
                  placement="right"
                  :disabled="!isCollapsed"
                >
                  <i-icon type="ios-search"></i-icon>
                  <span>Option 2</span>
                </i-tooltip>
              </i-menu-item>
              <i-menu-item name="3-3">
                <i-tooltip
                  class="menu__tooltip"
                  content="Option 3"
                  placement="right"
                  :disabled="!isCollapsed"
                >
                  <i-icon type="ios-settings"></i-icon>
                  <span>Option 3</span>
                </i-tooltip>
              </i-menu-item>
            </i-submenu>
          </i-menu>
        </i-sider>
        <i-content :style="{ margin: '20px', background: '#fff', minHeight: '260px' }">
          <router-view></router-view>
        </i-content>
      </i-layout>
    </i-layout>
  </div>
</template>

<script>
import {
  Layout,
  Header,
  Menu,
  MenuItem,
  Icon,
  Sider,
  Submenu,
  Tooltip,
  Content,
  Poptip
} from 'iview'
import defaultImg from './asset/logo.png'
import defaultImgMin from './asset/logo-min.png'

const PREFIX = 'sako-frame'
export default {
  name: 'SakoFrame',
  components: {
    [Layout.name]: Layout,
    [Header.name]: Header,
    [Menu.name]: Menu,
    [MenuItem.name]: MenuItem,
    [Icon.name]: Icon,
    [Sider.name]: Sider,
    [Submenu.name]: Submenu,
    [Tooltip.name]: Tooltip,
    [Content.name]: Content,
    [Poptip.name]: Poptip
  },
  props: {
    // logo 路由
    logo: {
      type: String,
      default: defaultImg
    },
    // logo缩略图
    logoMin: {
      type: String,
      default: defaultImgMin
    },
    // logo 路由
    logoRouter: {
      type: Object,
      default: () => {
        return {
          path: '/'
        }
      }
    },
    // 请求实例
    instance: {
      type: Function
    },
    // 相关登录的请求设置
    authorization: {
      type: Object,
      default: () => {}
    },
    singleSpa: {
      type: Object
    }
  },
  data() {
    return {
      prefix: PREFIX,
      isCollapsed: false,
      userInfo: {
        name: 'm18969136460@163.com'
      }
    }
  },
  computed: {
    logoSrc() {
      return this.isCollapsed ? this.logoMin : this.logo
    },
    logoScale() {
      return [
        `${this.prefix}__logo`,
        'cursor-pointer',
        {
          [`${this.prefix}__logo--scale`]: this.isCollapsed
        }
      ]
    },
    imgScale() {
      return this.isCollapsed ? 'scale' : ''
    },
    menuitemClasses() {
      return ['menu-item', this.isCollapsed ? 'collapsed-menu' : '']
    },
    rotateIcon() {
      return ['menu-icon', this.isCollapsed ? 'rotate-icon' : '']
    }
  },
  methods: {
    $_onClickLogoNavTo() {
      this.$router.push(this.logoRouter)
    },
    collapsedSider() {
      this.$refs.side.toggleCollapse()
    }
  }
}
</script>

<style lang="scss">
@import 'frame.scss';
</style>
