<template>
  <div :class="prefix">
    <Layout>
      <Header :class="prefix + '__header'">
        <Menu mode="horizontal" theme="primary" :active-name="topActiveName">
          <div :class="logoScale" @click="$_onClickLogoNavTo">
            <img :src="logoSrc" :class="imgScale" />
          </div>
          <Icon :class="rotateIcon" type="md-menu" size="24" @click.native="collapsedSider"></Icon>
          <div :class="prefix + '__nav'">
            <template v-for="item in functionTree">
              <MenuItem :name="item.functionName" :key="item.functionName">
                <Icon v-if="item.icon" :type="item.icon"></Icon>{{ item.functionName }}</MenuItem
              >
            </template>
            <!-- <MenuItem name="2"> <Icon type="ios-keypad"></Icon>Item 2 </MenuItem>
            <MenuItem name="3"> <Icon type="ios-analytics"></Icon>Item 3 </MenuItem>
            <MenuItem name="4"> <Icon type="ios-paper"></Icon>Item 4 </MenuItem> -->
          </div>
        </Menu>
        <div :class="prefix + '__slot'"></div>
        <div :class="prefix + '__right'">
          <div :class="[prefix + '__right__install', 'cursor-pointer']">
            <Icon type="ios-link" size="20"></Icon>
            <span>未安装</span>
          </div>
          <div :class="[prefix + '__right__user', 'm-2']">
            <Icon type="md-contact" size="20"></Icon>
            <Poptip width="250" trigger="hover" placement="bottom-end">
              <span
                :class="[
                  'text-truncate',
                  'align-vertical',
                  'd-inline',
                  prefix + '__right__username'
                ]"
              >
                {{
                  (loginInfo.user && loginInfo.user.nickName) ||
                    (loginInfo.user && loginInfo.user.realName)
                }}
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
            </Poptip>
          </div>
          <Poptip width="250" trigger="hover" placement="bottom-end">
            <Icon class="m-2" type="logo-buffer" size="20"></Icon>
            <template slot="title">
              <div class="d-flex">
                <span class="c-gray">常用菜单</span>
                <span class="ml-auto c-primary cursor-pointer">去设置</span>
              </div>
            </template>
            <template slot="content">
              <span class="c-gray">敬请期待...</span>
            </template>
          </Poptip>
          <Poptip width="250" trigger="hover" placement="bottom-end">
            <Icon class="m-2" type="md-notifications" size="20"></Icon>
            <template slot="title">
              <div class="d-flex">
                <span class="c-gray">消息中心</span>
              </div>
            </template>
            <template slot="content">
              <span class="c-gray">敬请期待...</span>
            </template>
          </Poptip>
          <Poptip width="250" trigger="hover" placement="bottom-end">
            <Badge :count="totalTask" :overflow-count="99" :offset="[18, 10]" v-if="totalTask">
              <Icon class="m-2" type="md-desktop" size="20"></Icon>
            </Badge>
            <Icon class="m-2" type="md-desktop" size="20" v-else></Icon>
            <template slot="title">
              <div class="d-flex">
                <span class="c-gray">我的工作台</span>
              </div>
            </template>
            <template slot="content">
              <span class="c-gray">敬请期待...</span>
            </template>
          </Poptip>
          <Tooltip content="退出登录">
            <Icon class="m-2" type="md-power" size="20" @click="$_onLogout"></Icon>
          </Tooltip>
        </div>
      </Header>
      <Layout>
        <Sider
          ref="side"
          hide-trigger
          accordion
          collapsible
          breakpoint="xl"
          :collapsed-width="64"
          v-model="isCollapsed"
        >
          <Menu
            :active-name="menuActiveName"
            theme="light"
            width="auto"
            accordion
            :open-names="menuOpenNames"
            :class="menuitemClasses"
          >
            <template v-for="item in subList">
              <Submenu
                :key="item.functionName"
                :name="item.functionName"
                v-if="item.childFuncList && item.childFuncList.length"
              >
                <template slot="title">
                  <Tooltip
                    class="menu__tooltip"
                    :content="item.functionName"
                    placement="right"
                    :disabled="!isCollapsed"
                  >
                    <Icon :type="item.icon" v-if="item.icon"></Icon>
                    <span>{{ item.functionName }}</span>
                  </Tooltip>
                </template>
                <MenuItem
                  v-for="child in item.childFuncList"
                  :name="child.functionName"
                  :key="child.functionName"
                >
                  <Tooltip
                    class="menu__tooltip"
                    :content="child.functionName"
                    placement="right"
                    :disabled="!isCollapsed"
                  >
                    <Icon :type="child.icon" v-if="child.icon"></Icon>
                    <span>{{ child.functionName }}</span>
                  </Tooltip>
                </MenuItem>
              </Submenu>
              <MenuItem :key="item.functionName" v-else>
                <Tooltip
                  class="menu__tooltip"
                  :content="item.functionName"
                  placement="right"
                  :disabled="!isCollapsed"
                >
                  <Icon :type="item.icon" v-if="item.icon"></Icon>
                  <span>{{ item.functionName }}</span>
                </Tooltip>
              </MenuItem>
            </template>
            <!-- <Submenu name="1">
              <template slot="title">
                <Tooltip
                  class="menu__tooltip"
                  content="内容管理"
                  placement="right"
                  :disabled="!isCollapsed"
                >
                  <Icon type="ios-paper"></Icon>
                  <span>内容管理</span>
                </Tooltip>
              </template>
              <MenuItem name="1-1">
                <Tooltip
                  class="menu__tooltip"
                  content="Option 1"
                  placement="right"
                  :disabled="!isCollapsed"
                >
                  <Icon type="ios-navigate"></Icon>
                  <span>Option 1</span>
                </Tooltip>
              </MenuItem>
              <MenuItem name="1-2">
                <Tooltip
                  class="menu__tooltip"
                  content="Option 2"
                  placement="right"
                  :disabled="!isCollapsed"
                >
                  <Icon type="ios-search"></Icon>
                  <span>Option 2</span>
                </Tooltip>
              </MenuItem>
              <MenuItem name="1-3">
                <Tooltip
                  class="menu__tooltip"
                  content="Option 3"
                  placement="right"
                  :disabled="!isCollapsed"
                >
                  <Icon type="ios-settings"></Icon>
                  <span>Option 3</span>
                </Tooltip>
              </MenuItem>
            </Submenu> -->
            <!-- <Submenu name="2">
              <template slot="title">
                <Tooltip
                  class="menu__tooltip"
                  content="内容管理"
                  placement="right"
                  :disabled="!isCollapsed"
                >
                  <Icon type="ios-paper"></Icon>
                  <span>内容管理</span>
                </Tooltip>
              </template>
              <MenuItem name="2-1">
                <tooltip
                  class="menu__tooltip"
                  content="Option 1"
                  placement="right"
                  :disabled="!isCollapsed"
                >
                  <Icon type="ios-navigate"></Icon>
                  <span>Option 1</span>
                </tooltip>
              </MenuItem>
              <MenuItem name="2-2">
                <Tooltip
                  class="menu__tooltip"
                  content="Option 2"
                  placement="right"
                  :disabled="!isCollapsed"
                >
                  <Icon type="ios-search"></Icon>
                  <span>Option 2</span>
                </Tooltip>
              </MenuItem>
              <MenuItem name="2-3">
                <Tooltip
                  class="menu__tooltip"
                  content="Option 3"
                  placement="right"
                  :disabled="!isCollapsed"
                >
                  <Icon type="ios-settings"></Icon>
                  <span>Option 3</span>
                </Tooltip>
              </MenuItem>
            </Submenu> -->
            <!-- <Submenu name="3">
              <template slot="title">
                <Tooltip
                  class="menu__tooltip"
                  content="内容管理"
                  placement="right"
                  :disabled="!isCollapsed"
                >
                  <Icon type="ios-paper"></Icon>
                  <span>内容管理</span>
                </Tooltip>
              </template>
              <MenuItem name="3-1">
                <Tooltip
                  class="menu__tooltip"
                  content="Option 1"
                  placement="right"
                  :disabled="!isCollapsed"
                >
                  <Icon type="ios-navigate"></Icon>
                  <span>Option 1</span>
                </Tooltip>
              </MenuItem>
              <MenuItem name="3-2">
                <Tooltip
                  class="menu__tooltip"
                  content="Option 2"
                  placement="right"
                  :disabled="!isCollapsed"
                >
                  <Icon type="ios-search"></Icon>
                  <span>Option 2</span>
                </Tooltip>
              </MenuItem>
              <MenuItem name="3-3">
                <Tooltip
                  class="menu__tooltip"
                  content="Option 3"
                  placement="right"
                  :disabled="!isCollapsed"
                >
                  <Icon type="ios-settings"></Icon>
                  <span>Option 3</span>
                </Tooltip>
              </MenuItem>
            </Submenu> -->
          </Menu>
        </Sider>
        <Content :class="prefix + '__content'">
          <router-view></router-view>
        </Content>
      </Layout>
    </Layout>
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
  Poptip,
  Message,
  Badge
} from 'iview'
import defaultImg from './asset/logo.png'
import defaultImgMin from './asset/logo-min.png'

const PREFIX = 'sako-frame'
export default {
  name: 'SakoFrame',
  components: {
    Layout,
    Header,
    Menu,
    MenuItem,
    Icon,
    Sider,
    Submenu,
    Tooltip,
    Content,
    Poptip,
    Badge
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
      type: Object
    },
    // 相关登录的请求设置
    authorization: {
      type: Object,
      default: () => {}
    },
    singleSpa: {
      type: Object
    },
    functionTree: {
      type: Array
    },
    subList: {
      type: Array
    },
    loginInfo: {
      type: Object
    }
  },
  data() {
    return {
      prefix: PREFIX,
      isCollapsed: false,
      topActiveName: null,
      menuOpenNames: [],
      menuActiveName: null,
      tasks: [],
      totalTask: 0
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
  mounted() {
    this.topActiveName =
      (this.functionTree && this.functionTree.length && this.functionTree[0].functionName) || ''
    this.menuOpenNames = [
      (this.subList && this.subList.length && this.subList[0].functionName) || ''
    ]
    this.menuActiveName =
      (this.subList &&
        this.subList.length &&
        this.subList[0].childFuncList &&
        this.subList[0].childFuncList.length &&
        this.subList[0].childFuncList[0].functionName) ||
      ''
    this.$_getTask()
  },
  methods: {
    $_onClickLogoNavTo() {
      this.$router.push(this.logoRouter)
    },
    collapsedSider() {
      this.$refs.side.toggleCollapse()
    },
    $_onLogout() {
      this.instance && this.instance.loginService
      this.instance.loginService
        .doLogout()
        .then(result => {
          if (result && result.data && result.data.success) {
            this.singleSpa.navigateToUrl('/saas-etcloud-login')
          }
        })
        .catch(error => {
          Message.error((error && error.message) || error)
        })
      this.$emit('frame-logout', {
        loginInfo: this.loginInfo
      })
    },
    $_getTask() {
      this.instance &&
        this.instance.workFlowService &&
        this.instance.workFlowService
          .getTask()
          .then(result => {
            if (result && result.data && result.data.success) {
              this.tasks = result.data.value || []
              this.totalTask = 0
              this.tasks.forEach(element => {
                this.totalTask += element.taskCount
              })
            }
          })
          .catch(error => {
            Message.error((error && error.message) || error)
          })
    }
  }
}
</script>

<style lang="scss">
@import 'frame.scss';
</style>
