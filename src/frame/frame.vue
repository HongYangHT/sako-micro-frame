<template>
  <div :class="prefix">
    <Layout>
      <Header :class="prefix + '__header'">
        <Menu
          mode="horizontal"
          theme="primary"
          :active-name="topActiveName"
          @on-select="$_onSelectTopMenu"
        >
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
          </div>
        </Menu>
        <div :class="prefix + '__slot'"></div>
        <div :class="prefix + '__right'">
          <div
            :class="[prefix + '__right__install', 'cursor-pointer', 'd-flex', 'align-items']"
            @click="$_onSoap"
          >
            <Icon type="ios-link" size="20"></Icon>
            <span>{{ soapStatus === 3 ? '已启动' : soapStatus === 2 ? '未启动' : '未安装' }}</span>
            <template v-if="soapStatus === 3">
              <Icon
                v-if="isSoapWarn"
                type="ios-alert"
                size="20"
                color="warning"
                class="cursor-pointer"
                @click="$_onChangeDisk"
              ></Icon>
              <span @click="$_onChangeDisk" class="cursor-pointer" v-else
                >开票点：{{ currentDiskCode }}</span
              >
            </template>
          </div>
          <div :class="[prefix + '__right__user', 'm-2']">
            <Icon type="md-contact" size="20"></Icon>
            <Poptip width="250" trigger="click" placement="bottom-end">
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
                  <span class="ml-auto c-primary cursor-pointer" @click="$_onChangePassword"
                    >修改密码</span
                  >
                </div>
              </template>
              <template slot="content">
                <!-- <span class="c-gray">敬请期待...</span> -->
                <Form :label-width="80" :class="prefix + '__form'">
                  <FormItem label="所属机构：">{{
                    loginInfo && loginInfo.user && loginInfo.user.orgOwnershipName
                  }}</FormItem>
                  <FormItem label="当前操作机构：">
                    <Select v-model="oparator" @on-change="$_onChangeOparator" transfer>
                      <Option
                        v-for="item in loginInfo.orgList"
                        :key="item.orgId"
                        :value="item.orgId"
                      >
                        {{ item.orgName }}
                      </Option>
                    </Select>
                  </FormItem>
                  <FormItem label="当前所用税号：">{{
                    loginInfo && loginInfo.sale && loginInfo.sale.saleCreditCode
                  }}</FormItem>
                  <FormItem label="当前开票方式：">{{
                    loginInfo && loginInfo.sale && loginInfo.sale.taxDiskTypeName
                  }}</FormItem>
                </Form>
              </template>
            </Poptip>
          </div>
          <Poptip width="250" trigger="hover" placement="bottom-end">
            <Icon class="m-2" type="logo-buffer" size="20"></Icon>
            <template slot="title">
              <div class="d-flex">
                <span class="c-gray">常用菜单</span>
                <span class="ml-auto c-primary cursor-pointer" @click="$_onSetCustomizedMenu"
                  >去设置</span
                >
              </div>
            </template>
            <template slot="content">
              <template v-if="customizedMenu && customizedMenu.length">
                <Tag
                  v-for="(item, index) in customizedMenu"
                  :key="item.functionId"
                  :color="$_setTagColor(index)"
                  @click="$_onNavToMenu(item)"
                >
                  {{ item.functionName }}
                </Tag>
              </template>
              <div class="c-gray d-flex" v-else>
                暂未设置常用菜单
              </div>
            </template>
          </Poptip>
          <Poptip width="250" trigger="hover" placement="bottom-end">
            <Badge :count="totalNotice" :overflow-count="99" :offset="[18, 10]" v-if="totalNotice">
              <Icon class="m-2" type="md-notifications" size="20"></Icon>
            </Badge>
            <Icon class="m-2" type="md-notifications" size="20"></Icon>
            <template slot="title">
              <div class="d-flex">
                <span class="c-gray">消息中心</span>
              </div>
            </template>
            <template slot="content">
              <template v-if="notices && notices.length">
                <div
                  class="c-gray d-flex"
                  :class="prefix + '__desktop'"
                  v-for="item in notices"
                  :key="item.noticeId"
                  @click="$_onNoticeItem(item)"
                >
                  <div class="text-ellipsis" :class="prefix + '__desktop__item'">
                    {{ item.noticeTitle }}
                  </div>
                  <div class="ml-auto" :class="prefix + '__desktop__item__count'">
                    ({{ item.createTime | format('yyyy:MM:dd hh:mm:ss') }})
                  </div>
                </div>
              </template>
              <div class="c-gray d-flex" v-else>
                暂无待处理消息
              </div>
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
              <template v-if="tasks && tasks.length">
                <div
                  class="c-gray d-flex"
                  :class="prefix + '__desktop'"
                  v-for="item in tasks"
                  :key="item.approveCode"
                  @click="$_onDesktopItem(item)"
                >
                  <div class="text-ellipsis" :class="prefix + '__desktop__item'">
                    {{ item.approveName }}
                  </div>
                  <div class="ml-auto" :class="prefix + '__desktop__item__count'">
                    ({{ item.taskCount }})
                  </div>
                </div>
              </template>
              <div class="c-gray d-flex" v-else>
                暂无待处理信息
              </div>
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
            @on-select="$_onSelectleftMenu"
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
          </Menu>
        </Sider>
        <Content :class="prefix + '__content'">
          <router-view></router-view>
        </Content>
      </Layout>
    </Layout>
    <Modal v-model="installSoap" title="操作提醒" @on-ok="$_downLoadSoap">
      <div>系统检测到未安装控制台依赖组件，请下载安装</div>
    </Modal>
    <Modal v-model="startSoap" title="操作提醒" @on-ok="$_onStartSoap">
      <div>未开启金税盘服务，请开启服务</div>
    </Modal>
    <Modal v-model="startOpenSoap" title="启动金税盘">
      <p>存在多个金税盘，请选择要开启的金税盘服务</p>
      <Form :label-width="60">
        <FormItem label="金税盘名称：">
          {{ diskName }}
        </FormItem>
        <FormItem label="金税盘税号：">
          <Select v-model="taxCode" placeholder="请选择金税盘税号">
            <Option v-for="item in taxCodeList" :key="item.taxCode" :value="item.taxCode">{{
              item.taxCode
            }}</Option>
          </Select>
        </FormItem>
        <FormItem label="开票点编号：">
          <Select v-model="taxCode" placeholder="请选择开票点编号">
            <Option v-for="item in diskCodeList" :key="item" :value="item">{{ item }}</Option>
          </Select>
        </FormItem>
      </Form>
      <template slot="footer">
        <Button type="primary" :disabled="!diskCode && diskCode !== 0" @click="$_onStartOpenSoap">
          开启服务
        </Button>
      </template>
    </Modal>
    <Modal v-model="changeSoap" title="切换金税盘">
      <Form :label-width="60">
        <FormItem label="当前机构：">
          {{ loginInfo && loginInfo.user && loginInfo.user.orgOwnershipName }}
        </FormItem>
        <FormItem label="当前机构税号：">
          {{ loginInfo && loginInfo.sale && loginInfo.sale.saleCreditCode }}
        </FormItem>
        <FormItem label="金税盘名称：">
          {{ diskName }}
        </FormItem>
        <FormItem label="金税盘税号：">
          <Select v-model="taxCode" placeholder="请选择金税盘税号">
            <Option v-for="item in taxCodeList" :key="item.taxCode" :value="item.taxCode">{{
              item.taxCode
            }}</Option>
          </Select>
        </FormItem>
        <FormItem label="开票点编号：">
          <Select v-model="taxCode" placeholder="请选择开票点编号">
            <Option v-for="item in diskCodeList" :key="item" :value="item">{{ item }}</Option>
          </Select>
        </FormItem>
      </Form>
      <h5 v-if="isSameDisk" class="c-success">金税盘和当前所属机构税号一致！</h5>
      <h5 v-else class="c-error">金税盘和当前机构税号不一致或无此开票点权限，请修改！</h5>
      <template slot="footer">
        <Button type="primary" :disabled="!isSameDisk" @click="$_onDoChangeSoap">
          开启服务
        </Button>
      </template>
    </Modal>
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
  // Message,
  Badge,
  Form,
  FormItem,
  Select,
  Option,
  Tag,
  Modal
} from 'iview'
import defaultImg from './asset/logo.png'
import defaultImgMin from './asset/logo-min.png'
import format from 'date-format'
import { localStore } from '../utils/storage'
import {
  APP_NAMESPACE,
  APP_LOGIN_INFO,
  APP_FUNCTION_LIST,
  APP_PAGE_LIST,
  APP_SUB_LIST,
  APP_FUNCTION_TREE,
  APP_TOKEN,
  APP_SOAP,
  APP_SOAP_RESPONSE
} from '../utils/constants'
import { transData } from '../utils/tree'
import axios from 'axios'

const SET_FUNCTION_LIST = 'setFunctionList'
const SET_LOGIN_INFO = 'setLoginInfo'
const SET_FUNCTION_TREE = 'setFunctionTree'
const SET_SUB_LIST = 'setSubList'
const SET_PAGE_LIST = 'setPageList'

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
    Badge,
    Form,
    FormItem,
    Select,
    Option,
    Tag,
    Modal
  },
  filters: {
    format(fmt, date) {
      return format(fmt, new Date(date))
    }
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
    },
    token: {
      type: String
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
      totalTask: 0,
      notices: [],
      totalNotice: 0,
      oparator: '',
      customizedMenu: [],
      soapStatus: null,
      isSoapWarn: null,
      currentDiskCode: null,
      installSoap: false,
      startSoap: false,
      taxCode: null,
      diskCode: null,
      taxCodeList: [],
      diskList: [],
      diskCodeList: [],
      diskName: null,
      startOpenSoap: false,
      changeSoap: false
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
    this.oparator = this.loginInfo && this.loginInfo.org && this.loginInfo.org.orgId
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
    this.$_getNotice()
    this.$_getCustomizedMenu()

    /* NOTE: 增加websocket */
    window.client = null
    window.wsTimer = null
    // eslint-disable-next-line
    window.websocketConnect = name => {
      const _path = `${location.protocol === 'https:' ? 'wss' : 'ws'}://${
        /localhost/.test(location.host) ? '192.168.51.193' : location.host
      }/socket/websocket`
      const ws = new WebSocket(_path)
      ws.onopen = function() {
        console.log(_path)
        ws.send(`${name}workflowNotice`)
        ws.send(`${name}messageCenterNotice`)
        window.wsTimer = setInterval(() => {
          ws.send('heartbeat')
        }, 30000)
      }
      ws.onmessage = function(e) {
        console.log('工作台待办消息广播成功', e)
        if (JSON.parse(e.data).sid == `${name}workflowNotice`) this.$_getTask()
        if (JSON.parse(e.data).sid == `${name}messageCenterNotice`) this.$_getNotice()
      }
      ws.onclose = function(e) {
        console.log('工作台待办消息socket关闭', e)
      }
      return ws
    }
    // eslint-disable-next-line
    window.websocketDisconnect = client => {
      if (client) {
        client.close()
        clearInterval(window.wsTimer)
      }
    }

    if (!window.client)
      window.client = window.websocketConnect(
        this.loginInfo &&
          this.loginInfo.user &&
          (this.loginInfo.user.userName || this.loginInfo.user.realName)
      )

    this.$_checkSoap()

    function checkSoapBeforeTaxCore() {
      if (this.soapStatus == 1) {
        this.$_installSoap()
        return true
      } else if (this.soapStatus == 2) {
        this.$_startSoap()
        return true
      } else if (this.soapStatus == 3) {
        return false
      }
    }
    window.checkSoapBeforeTaxCore = checkSoapBeforeTaxCore
  },
  methods: {
    async $_checkSoap() {
      let token = this.token || localStore.get(APP_TOKEN)
      if (!token) return
      const soap = localStore.get(APP_SOAP)
      if (soap && new Date().getTime() - soap.timer < 10000) {
        setTimeout(() => {
          this.$_checkSoap()
        }, 1000)
        return false
      }
      try {
        const inSvr = await axios.post('http://127.0.0.1:8888/InvSvr', {
          data: {
            SID: '1106',
            SIDParam: ''
          },
          timeout: 30000
        })
        let DECMSG = null
        if (inSvr && inSvr.data) {
          DECMSG = JSON.parse(inSvr.data)
            .ENCMSG.replace(new RegExp('[_]', 'gm'), '+')
            .replace(new RegExp(/(\r)/g), '')
            .replace(new RegExp(/(\n)/g), '')
        }

        let decode = null
        if (this.instance && this.instance.ovatService && this.instance.ovatService.base64Decode) {
          decode = await this.instance.ovatService.base64Decode({
            data: {
              invData: DECMSG,
              codeType: 'decode'
            }
          })
          const resInfo = JSON.parse(decode && decode.data && decode.data.value)
          if (resInfo.retcode == 1) {
            if (resInfo.openFlag == -1) {
              console.log('soap状态繁忙')
              this.soapStatus = this.soapStatus || 3
            } else if (resInfo.openFlag == 0) {
              this.soapStatus = 1
            } else if (resInfo.openFlag == 4 || resInfo.openFlag == 5) {
              this.soapStatus = 3
              this.$_checkIsSoapWarn()
            } else {
              this.soapStatus = 2
            }
          } else {
            this.soapStatus = 1
          }
          localStore.set(APP_SOAP, {
            status: this.soapStatus,
            timer: new Date().getTime()
          })
          localStorage.setItem(
            'soap',
            JSON.stringify({
              status: this.soapStatus,
              timer: new Date().getTime()
            })
          )
        }
      } catch (error) {
        this.soapStatus = 1
        localStore.set(APP_SOAP, {
          status: this.soapStatus,
          timer: new Date().getTime()
        })
        localStorage.setItem(
          'soap',
          JSON.stringify({
            status: this.soapStatus,
            timer: new Date().getTime()
          })
        )
      }
      setTimeout(() => {
        this.$_checkSoap()
      }, 10000)
    },
    $_onSoap() {
      switch (this.soapStatus) {
        case 1: // NOTE: 未安装
          this.$_installSoap()
          break
        case 2: // NOTE: 未启动
          this.$_startSoap()
          break
        case 3: // NOTE: 已启动
          break
        default:
          this.$_installSoap()
          break
      }
    },
    $_installSoap() {
      this.installSoap = true
    },
    $_downLoadSoap() {
      this.instance &&
        this.instance.loginService &&
        this.instance.loginService
          .getSoftwareVersion()
          .then(result => {
            if (result && result.data && result.data.success) {
              let downloadSrc =
                result.data.value &&
                result.data.value.software &&
                result.data.value.software.install_url
              let iframe = document.createElement('iframe')
              iframe.style.display = 'none'
              document.body.appendChild(iframe)
              iframe.src = downloadSrc
            }
            this.installSoap = false
          })
          .catch(error => {
            this.installSoap = false
            this.$Message.error((error && error.message) || error)
          })
    },
    $_startSoap() {
      this.startSoap = true
    },
    $_onStartSoap() {
      this.startSoap = false
      const msg = this.$Message.loading({
        content: '服务正在开启中...',
        duration: 0
      })
      this.$_useSoap(1107)
        .then(result => {
          setTimeout(msg, 0)
          if (result.retcode == 1) {
            if (
              result.regCode &&
              result.regCode.listSubRegTaxcode &&
              result.regCode.listSubRegTaxcode.length > 1
            ) {
              this.startOpenSoap = true
              this.taxCode = result.regCode.defualtTaxcode
              this.diskCode = result.regCode.defaultMachineNO
              this.$_mapTaxList(result.regCode.listSubRegTaxcode).then(res => {
                this.taxCodeList = res.resList
                this.diskList = res.diskList
                this.$_diskInfoChange(result.regCode)
              })
            } else {
              this.$_checkDisk(result.regCode.defualtTaxcode, result.regCode.defaultMachineNO)
                .then(() => {
                  this.$_useSoap(12).then(res => {
                    if (res.retcode == '1011') {
                      this.$Message.success('启动成功')
                      this.$_checkSoap()
                    } else {
                      this.$Message.error(res.retmsg)
                    }
                  })
                })
                .catch(() => {
                  this.$Message.error('设备启动超时，请刷新后重试！')
                })
            }
          } else {
            this.$Message.error('获取当前注册表中金税盘信息失败')
          }
        })
        .catch(() => {
          this.$Message.error('设备启动超时，请刷新后重试！')
          setTimeout(msg, 0)
        })
    },
    $_onStartOpenSoap() {
      const msg = this.$Message.loading({
        content: '服务正在开启中...',
        duration: 0
      })
      this.$_checkDisk(this.taxCode, this.diskCode)
        .then(() => {
          this.startOpenSoap = false
          setTimeout(msg, 0)
          this.$_useSoap(12).then(res => {
            if (res.retcode == '1011') {
              this.$Message.success('启动成功')
              this.$_checkSoap()
            } else {
              this.$Message.error(res.retmsg)
            }
          })
        })
        .catch(() => {
          this.startOpenSoap = false
          setTimeout(msg, 0)
          this.$Message.error('设备启动超时，请刷新后重试！')
        })
    },
    $_checkDisk(taxCode, diskCode) {
      return new Promise(async (resolve, reject) => {
        try {
          let encode = null
          if (this.instance && this.instance.ovatService) {
            encode = await this.instance.ovatService.base64Decode({
              data: {
                invData: JSON.stringify({
                  taxcode: taxCode,
                  machineNO: diskCode,
                  terminalNO: '',
                  diskType: 0
                }),
                codeType: 'encode'
              }
            })
            if (encode && encode.data && encode.data.value) {
              const inSvr = await axios.post('http://127.0.0.1:8888/InvSvr', {
                data: {
                  SID: '1104',
                  SIDParam: encode.data.value
                },
                timeout: 30000
              })
              let DECMSG = null
              if (inSvr && inSvr.data) {
                DECMSG = JSON.parse(inSvr.data)
                  .ENCMSG.replace(new RegExp('[_]', 'gm'), '+')
                  .replace(new RegExp(/(\r)/g), '')
                  .replace(new RegExp(/(\n)/g), '')
              }

              let decode = null
              if (
                this.instance &&
                this.instance.ovatService &&
                this.instance.ovatService.base64Decode
              ) {
                decode = await this.instance.ovatService.base64Decode({
                  data: {
                    invData: DECMSG,
                    codeType: 'decode'
                  }
                })
                const resInfo = JSON.parse(decode && decode.data && decode.data.value)
                if (resInfo.retcode === '1') {
                  resolve()
                } else {
                  reject()
                }
              }
            }
          }
        } catch (error) {
          reject()
        }
      })
    },
    $_diskInfoChange(diskConfig, v) {
      this.taxCodeList.forEach(o => {
        if (o.taxCode === this.taxCode) this.diskCodeList = o.arr
      })
      if (this.taxCode === diskConfig.defualtTaxcode && v) {
        this.diskCode = diskConfig.defaultMachineNO
      } else if (v) {
        this.diskCode = this.diskCodeList[0]
      }
      const disk = this.diskList.filter(item => {
        return item.machineNO === this.diskCode && item.taxcode == this.taxCode
      })
      this.diskName = disk[0] && disk[0].diskName
    },
    $_mapTaxList(list) {
      return new Promise((resolve, reject) => {
        this.instance &&
          this.instance.loginService &&
          this.instance.loginService
            .fixDiskCodeName({
              data: {
                ...list
              }
            })
            .then(result => {
              let diskList = []
              let resList = []
              if (result && result.data && result.data.success) {
                diskList = result && result.data && result.data.value
                let obj = {}
                diskList.forEach(item => {
                  if (!obj[item.taxcode]) {
                    obj[item.taxcode] = [item.machineNO]
                  } else {
                    obj[item.taxcode].push(item.machineNO)
                  }
                })
                for (const i in obj) {
                  resList.push({
                    taxCode: i,
                    arr: obj[i]
                  })
                }
              }
              resolve({
                resList,
                diskList
              })
            })
            .catch(err => {
              reject(err)
            })
      })
    },
    $_checkIsSoapWarn() {
      // NOTE: 已启动的情况下
      if (this.soapStatus === 3) {
        this.$_useSoap(1103).then(result => {
          localStore.set(APP_SOAP_RESPONSE, result)
          localStorage.setItem('soap-reponse', result)
          if (result.retcode === '1') {
            if (!result.djTaxcode || !result.djMachineNO) {
              this.$_getDiskInfo().then(diskInfo => {
                result.djTaxcode = JSON.parse(diskInfo).TaxCode
                result.djMachineNO = `${JSON.parse(diskInfo).MachineNo}`
                this.isSoapWarn = true
                if (
                  this.loginInfo.sale &&
                  result.djTaxcode === this.loginInfo.sale.saleCreditCode
                ) {
                  this.loginInfo.sysUkeyList.forEach(item => {
                    if (item.diskCode == result.djMachineNO) {
                      setTimeout(() => {
                        this.isSoapWarn = false
                        this.currentDiskCode = result.djMachineNO
                      })
                    }
                  })
                }
              })
            } else if (
              this.loginInfo.sale &&
              result.djTaxcode === this.loginInfo.sale.saleCreditCode
            ) {
              this.isSoapWarn = true
              this.loginInfo.sysUkeyList.forEach(item => {
                if (item.diskCode === result.djMachineNO) {
                  setTimeout(() => {
                    this.isSoapWarn = false
                    this.currentDiskCode = result.djMachineNO
                  })
                }
              })
            } else {
              this.isSoapWarn = true
            }
          }
        })
      }
    },
    $_getDiskInfo() {
      return new Promise(async (resolve, reject) => {
        try {
          const diskInfo = await axios.get('http://127.0.0.1:8888/InvSvr', {
            data: {
              SID: 25,
              SIDParam:
                'eyJTSURQYXJhbSI6ICI8P3htbCB2ZXJzaW9uPScxLjAnIGVuY29kaW5nPSdHQksnPz48RlBYVF9DT01fSU5QVVQ_PElEPjA0MDA8L0lEPjxEQVRBPjwvREFUQT48L0ZQWFRfQ09NX0lOUFVUPiJ9'
            },
            timeout: 30000
          })
          let DECMSG = null
          if (diskInfo && diskInfo.data && diskInfo.data.ENCMSG) {
            DECMSG = diskInfo.data.ENCMSG.replace(new RegExp('[_]', 'gm'), '+')
              .replace(new RegExp(/(\r)/g), '')
              .replace(new RegExp(/(\n)/g), '')
          }

          let decode = null
          if (
            this.instance &&
            this.instance.ovatService &&
            this.instance.ovatService.base64Decode
          ) {
            decode = await this.instance.ovatService.base64Decode({
              data: {
                invData: DECMSG,
                codeType: 'decode',
                kpfs: 0
              }
            })
            const resInfo = JSON.parse(decode && decode.data && decode.data.value)
            resolve(resInfo.replace(new RegExp(/(\r)/g), '').replace(new RegExp(/(\n)/g), ''))
          }
        } catch (error) {
          reject('金税盘服务调用失败')
        }
      })
    },
    $_useSoap(SID) {
      // eslint-disable-next-line
      return new Promise(async (resolve, reject) => {
        try {
          const inSvr = await axios.post('http://127.0.0.1:8888/InvSvr', {
            data: {
              SID,
              SIDParam: ''
            },
            timeout: 30000
          })
          let DECMSG = null
          if (inSvr && inSvr.data) {
            DECMSG = JSON.parse(inSvr.data)
              .ENCMSG.replace(new RegExp('[_]', 'gm'), '+')
              .replace(new RegExp(/(\r)/g), '')
              .replace(new RegExp(/(\n)/g), '')
          }

          let decode = null
          if (
            this.instance &&
            this.instance.ovatService &&
            this.instance.ovatService.base64Decode
          ) {
            decode = await this.instance.ovatService.base64Decode({
              data: {
                invData: DECMSG,
                codeType: 'decode'
              }
            })
            const resInfo = JSON.parse(decode && decode.data && decode.data.value)
            resolve(resInfo)
          }
        } catch (error) {
          reject()
        }
      })
    },
    $_onChangeDisk() {
      const response = localStore.get(APP_SOAP_RESPONSE)
      this.taxCodeList = []
      this.taxCode = response.djTaxcode
      this.diskCode = response.djMachineNO
      this.$_mapTaxList(response.regDJ).then(res => {
        this.taxCodeList = res.resList
        this.diskList = res.diskList
        this.taxCodeList.forEach(o => {
          if (o.taxCode === this.taxCode) this.diskCodeList = o.arr
        })
        this.$_checkTaxCodeAndDisk()
        this.changeSoap = true
      })
    },
    $_checkTaxCodeAndDisk(v) {
      const response = localStore.get(APP_SOAP_RESPONSE)
      this.isSameDisk = false
      this.taxCodeList.forEach(o => {
        if (o.taxCode == this.taxCode) this.diskCodeList = o.arr
      })
      if (this.taxCode == response.djTaxcode && v) {
        this.diskCode = response.djMachineNO
      } else if (v) {
        this.diskCode = this.diskCodeList[0]
      }
      if (this.taxCode == this.userInfo.sale.saleCreditCode) {
        this.userInfo.sysUkeyList.forEach(item => {
          if (item.diskCode == this.diskCode) this.isSameDisk = true
        })
      }
      const disk = this.diskList.filter(item => {
        return item.machineNO == this.diskCode && item.taxcode == this.taxCode
      })
      this.diskName = disk[0] && disk[0].diskName
    },
    $_diskInfoChangeAnother(v) {
      this.$_checkTaxCodeAndDisk(v)
    },
    $_onDoChangeSoap() {
      if (!this.isSameDisk) {
        return
      }

      const msg = this.$Message.loading({
        content: '正在切盘中...',
        duration: 0
      })

      this.$_checkDisk(this.taxCode, this.diskCode)
        .then(() => {
          setTimeout(msg, 0)
          this.$_useSoap(12).then(res => {
            if (res.retcode == '1011') {
              this.$Message.success('启动成功')
              this.$_checkSoap()
            } else {
              this.$Message.error(res.retmsg)
            }
          })
        })
        .catch(() => {
          this.$Message.error('设备启动超时，请刷新后重试！')
          setTimeout(msg, 0)
        })
    },
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
          window.websocketDisconnect(window.client)
          this.$_clearStorage()
          localStore.remove(APP_TOKEN)
          localStore.remove(APP_SOAP)
          localStore.remove(APP_SOAP_RESPONSE)
          localStorage.removeItem('id_token')
          localStorage.removeItem('soap')
        })
        .catch(error => {
          this.$Message.error((error && error.message) || error)
        })
      this.$emit('on-frame-logout', {
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
            this.$Message.error((error && error.message) || error)
          })
    },
    $_onDesktopItem(item) {
      this.$emit('on-frame-desktop-item', item)
    },
    $_getNotice() {
      this.instance &&
        this.instance.loginService &&
        this.instance.loginService
          .getNotice()
          .then(result => {
            if (result && result.data) {
              this.notices = (result && result.data && result.data.length) || []
              this.totalNotice = 0
              this.notices.forEach(element => {
                this.totalNotice += element.noticeCount
              })
            }
          })
          .catch(error => {
            this.$Message.error((error && error.message) || error)
          })
    },
    $_onNoticeItem(item) {
      this.$emit('on-frame-notice-item', item)
    },
    $_onChangePassword() {
      this.$emit('on-frame-change-password', this.loginInfo)
    },
    async $_onChangeOparator(oparatorId) {
      // NOTE: 需要更新登录信息
      this.$emit('on-frame-change-oparator', oparatorId)
      /**
       * 0. 更改当前机构信息
       * 1. 清空缓存信息
       * 2. 更新菜单
       * 3. 重新更新个人信息
       * 4. 做页面重定位
       * 5. 更新常用菜单、工作台、消息中心
       */
      try {
        const orgResult = await this.$_changeOrg(oparatorId)
        if (orgResult && orgResult.data && orgResult.data.success)
          this.$Message.success('切换机构成功')
        this.$_clearStorage()
        const loginInfo = await this.$_getLoginInfo()
        if (loginInfo && loginInfo.data && loginInfo.data.value) {
          localStore.set(APP_LOGIN_INFO, loginInfo.data.value)
          localStorage.setItem('user_info', JSON.stringify(loginInfo.data.value))
        }
        const functionList = await this.$_getFunctionList()
        if (functionList && functionList.data && functionList.data.value) {
          localStore.set(APP_FUNCTION_LIST, functionList.data.value)
          localStorage.setItem('function_list', JSON.stringify(functionList.data.value))
        }
        // NOTE: 同步到数据总线中去
        this.$_setLocalInfo(functionList.data.value, loginInfo.data.value)

        const r = this.$_initSystem()
        if (
          loginInfo &&
          loginInfo.data &&
          loginInfo.data.value &&
          loginInfo.data.value.user &&
          loginInfo.data.value.user.userType === 0
        ) {
          // 跳转到 home.admin 由该模块决定重定向到用户所在页面
          this.singleSpa.navigateToUrl('/saas-etcloud-permission')
        } else {
          if (!r) {
            this.$Message.error('该机构没有任何操作权限，请先联系管理员添加权限')
            this.singleSpa.navigateToUrl('/saas-etcloud-login')
          }
          // else {
          // window.location.reload()
          // const r = operationService.init()
          // if (r[0].defaultUrl) {
          //   $state.go(
          //     r[0].defaultUrl,
          //     {},
          //     {
          //       reload: true
          //     }
          //   )
          // } else {
          //   $state.go(
          //     r[0].url,
          //     {},
          //     {
          //       reload: true
          //     }
          //   )
          // }
          // }
        }
        this.$_getCustomizedMenu()
        this.$_getTask()
        this.$_getNotice()
        // FIXME: 查询是否插盘
      } catch (error) {
        this.$Message.error((error && error.message) || error)
      }
    },
    $_changeOrg(oparatorId) {
      return (
        this.instance &&
        this.instance.loginService &&
        this.instance.loginService.changeOrg({
          data: {
            orgId: oparatorId
          },
          params: {
            orgId: oparatorId
          }
        })
      )
    },
    $_getLoginInfo() {
      return (
        this.instance && this.instance.loginService && this.instance.loginService.getLoginInfo()
      )
    },
    $_getFunctionList() {
      return (
        this.instance && this.instance.loginService && this.instance.loginService.getFunctionList()
      )
    },
    $_setLocalInfo(functionList = {}, loginInfo = {}) {
      // NOTE: 同步到APP数据总线
      // eslint-disable-next-line
      globalEventStore && globalEventStore.commit(`${APP_NAMESPACE}/${SET_FUNCTION_LIST}`, functionList)
      // eslint-disable-next-line
      globalEventStore && globalEventStore.commit(`${APP_NAMESPACE}/${SET_LOGIN_INFO}`, loginInfo)
    },
    $_initSystem() {
      let loginInfo = localStore.get(APP_LOGIN_INFO)
      let functionList = localStore.get(APP_FUNCTION_LIST)
      if (!functionList.length) return false
      // 生成页面权限列表
      let pageList = this.$_generatePageRightList(loginInfo, functionList)

      localStore.set(APP_PAGE_LIST, pageList)
      localStorage.setItem('page_list', JSON.stringify(pageList))

      // NOTE: 同步到APP数据总线
      // eslint-disable-next-line
      globalEventStore && globalEventStore.commit(`${APP_NAMESPACE}/${SET_PAGE_LIST}`, pageList)

      // NOTE: 销方不存在，则不显示金税盘管理模块
      if (!loginInfo.sale) {
        let index = functionList.findIndex(item => item.treeLevelCode === '0_2_90_93')
        functionList = functionList.splice(index, 1)
      }

      let functionTree = transData(
        functionList,
        'functionId',
        'parentFunctionId',
        'childFuncList',
        'functionId'
      )

      functionTree =
        (functionTree.length &&
          functionTree.map(item => {
            const defaultRouter = {}
            if (item.childFuncList !== null && item.childFuncList[0].childFuncList !== null) {
              defaultRouter.defaultUrl = item.childFuncList[0].childFuncList[0].url
            }
            return Object.assign({}, defaultRouter, item)
          })) ||
        []
      let structureDate = functionTree
      let subNav = (functionTree.length && functionTree[0].childFuncList) || []

      localStore.set(APP_SUB_LIST, subNav)
      localStorage.setItem('sub-nav', JSON.stringify(subNav))

      localStore.set(APP_FUNCTION_LIST, functionList)
      localStore.set(APP_FUNCTION_TREE, structureDate)

      // NOTE: 同步到APP数据总线
      // eslint-disable-next-line
      globalEventStore && globalEventStore.commit(`${APP_NAMESPACE}/${SET_FUNCTION_TREE}`, structureDate)
      // eslint-disable-next-line
      globalEventStore && globalEventStore.commit(`${APP_NAMESPACE}/${SET_SUB_LIST}`, subNav)

      localStorage.setItem('function_tree', JSON.stringify(structureDate))
      localStorage.setItem('function_list', JSON.stringify(functionList))

      return structureDate
    },
    $_generatePageRightList(loginInfo, functionList) {
      const userType = loginInfo.user.userType
      // 所有账号都有的权限
      let pageList = [
        'index.list',
        'index.changeInitPw',
        'index.menuset',
        'message.list',
        'workspace.list',
        'workspace.item',
        'workspace.item.detail',
        'workspace.item.opened',
        'workspace.item.bill',
        'workspace.item.redinfo',
        'workspace.blue',
        'workspace.item.management',
        'workspace.item.vehicle',
        'workspace.item.reiburseInfo',
        'workspace.item.reopenVehicleApprove',
        'workspace.item.roll',
        'outputManage.FOManage.eleInvoice.printView'
      ]
      if (userType == 0) {
        pageList.push(
          'initStep',
          'initStep.initStepOne',
          'initStep.initStepTwo',
          'initStep.initStepThree',
          'initStep.initStepFour'
        )
      }
      // NOTE: 暂时用于区分版本用
      // if (IS_PROVIDER) pageList = ['help.list', 'help.changeInitPw', 'help.initChangePW']
      functionList.forEach(functionItem => {
        if (functionItem.url) {
          pageList.push(functionItem.url)
        }
        if (functionItem.remark && functionItem.remark !== 'null') {
          pageList = pageList.concat(functionItem.remark.split(','))
        }
      })
      return pageList
    },
    $_clearStorage() {
      localStore.remove(APP_LOGIN_INFO)
      localStore.remove(APP_FUNCTION_LIST)
      localStore.remove(APP_FUNCTION_TREE)
      localStore.remove(APP_PAGE_LIST)
      localStore.remove(APP_SUB_LIST)

      // 删除angular中存储
      localStorage.removeItem('user_info')
      localStorage.removeItem('function_tree')
      localStorage.removeItem('page_list')
      localStorage.removeItem('function_list')
      localStorage.removeItem('sub-nav')
    },
    $_getCustomizedMenu() {
      this.instance &&
        this.instance.loginService &&
        this.instance.loginService
          .getCustomizedMenu({
            params: {
              type: 2
            }
          })
          .then(result => {
            if (result && result.data && result.data.success) {
              this.customizedMenu = result && result.data && JSON.parse(result.data.value)
            }
          })
          .catch(error => {
            this.$Message.error((error && error.message) || error)
          })
    },
    $_setTagColor(index) {
      let color = 'primary'
      switch (index % 4) {
        case 0:
          color = 'primary'
          break
        case 1:
          color = 'success'
          break
        case 2:
          color = 'error'
          break
        case 3:
          color = 'warning'
          break
        case 4:
          color = 'orange'
          break
        default:
          color = 'primary'
          break
      }
      return color
    },
    $_onSetCustomizedMenu() {
      this.$emit('on-frame-set-customized-menu')
    },
    $_onNavToMenu(item) {
      this.$emit('on-frame-customized-menu', item)
    },
    $_onSelectTopMenu(functionName) {
      let item = this.functionTree.find(item => item.functionName === functionName)
      this.$emit('on-frame-top-menu-select', {
        functionName,
        item
      })
    },
    $_onSelectleftMenu(functionName) {
      let item = this.subList.find(item => item.functionName === functionName)
      this.$emit('on-frame-left-menu-select', {
        functionName,
        item
      })
    }
  }
}
</script>

<style lang="scss">
@import 'frame.scss';
</style>
