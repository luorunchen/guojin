<template>
  <div id="dianli">
    <el-dialog
      v-model="dialogVisible"
      title="设备详情"
      width="60%"
      :before-close="handleClose"
    >
      <div
        v-loading="loading"
        element-loading-text="Loading..."
        :element-loading-spinner="svg"
        element-loading-svg-view-box="-10, -10, 50, 50"
        element-loading-background="rgba(4, 19, 54)"
      >
        <el-row
          ><el-button
            type="primary "
            @click="(setVisible = true), (activeName = 'first')"
            >设备设置</el-button
          >
          <el-button
            type="primary"
            @click="(dataVisible = true), Historical_alarm()"
            >历史报警</el-button
          >
          <el-button
            type="primary"
            @click="(dataVisible = true), getAlarmAndFaultFun()"
            >当前报警</el-button
          >
          <el-button type="primary" @click="exportData()">数据导出</el-button>
        </el-row>
        <br />
        <el-row :gutter="20">
          <el-col :span="6">
            <div class="shebeiInfo">
              <div class="one">
                <p class="titleP">设备信息</p>
                <ul v-for="(item, index) in ElecDataList.DevData" :key="index">
                  <div
                    class="ulInfo"
                    style="background: #13d61c"
                    v-if="item.typeName == '正常' && item.status == '在线'"
                  >
                    <p style="margin-top: 60px">设备正常/{{ item.status }}</p>
                  </div>
                  <div
                    class="ulInfo"
                    style="background: #999"
                    v-else-if="item.typeName == '正常' && item.status == '离线'"
                  >
                    <p style="margin-top: 60px">设备正常/{{ item.status }}</p>
                  </div>

                  <div
                    class="ulInfo"
                    style="background: #eb8814"
                    v-else-if="item.typeName.indexOf('故障') > 0"
                  >
                    <p style="margin-top: 50px">设备故障/{{ item.status }}</p>
                    <p>{{ item.level == "0" ? "" : item.level }}</p>
                  </div>
                  <div
                    v-if="item.typeName.indexOf('报警') >= 0"
                    style="background: #d61313"
                    class="ulInfo"
                  >
                    <p style="margin-top: 60px">设备报警/{{ item.status }}</p>

                    <p>{{ item.level == "0" ? "" : item.level }}</p>
                  </div>
                  <li>
                    设备编号: <span>{{ item.productNumber }}</span>
                  </li>
                  <li>
                    设备状态: <span> {{ item.status }}</span>
                  </li>
                  <li>
                    报警手机: <span>{{ item.master }}</span>
                  </li>
                  <li>
                    报警信息:
                    <span v-if="item.typeName != '正常'" style="color: red">{{
                      item.typeName
                    }}</span>
                    <span v-else style="color: blue">{{ item.typeName }}</span>
                  </li>
                  <li>
                    最新数据:
                    <span v-if="item.typeName != '正常'" style="color: red">{{
                      item.newestDate
                    }}</span>
                    <span v-else style="color: blue">{{
                      item.newestDate
                    }}</span>
                  </li>

                  <li>
                    保险单号:
                    <span>
                      {{
                        item.policy == "0" ? "暂无保险单号" : item.policy
                      }}</span
                    >
                  </li>
                  <li>
                    安装位置: <span>{{ item.installLocation }}</span>
                  </li>
                  <li>
                    安装日期: <span>{{ item.regdate }}</span>
                  </li>
                  <li>
                    开启流量:
                    <span>{{ item.flow == "0" ? "否" : "item.flow" }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </el-col>
          <el-col :span="18">
            <el-row :gutter="20">
              <el-col :span="8" v-for="(item, index) in infoData" :key="index">
                <div class="boxWapper">
                  <div class="infoBox">
                    <el-row>
                      <el-col :span="item.D1 != undefined ? 6 : 8">
                        <img :src="item.images" alt="" srcset="" />
                        <p>{{ item.A1 }}</p>
                        <p>{{ item.A2 }}</p>
                      </el-col>
                      <el-col :span="item.D1 != undefined ? 6 : 8">
                        <img :src="item.images" alt="" srcset="" />
                        <p>{{ item.B1 }}</p>
                        <p>{{ item.B2 }}</p>
                      </el-col>
                      <el-col :span="item.D1 != undefined ? 6 : 8">
                        <img :src="item.images" alt="" srcset="" />
                        <p>{{ item.C1 }}</p>
                        <p>{{ item.C2 }}</p>
                      </el-col>
                      <el-col :span="6" v-if="item.D1 != undefined">
                        <img :src="item.images" alt="" srcset="" />
                        <p class="textLong">{{ item.D1 }}</p>
                        <p class="textLong">{{ item.D2 }}</p>
                      </el-col>
                    </el-row>
                  </div>
                  <ul>
                    <li>
                      报警状态:<span
                        :style="
                          item.alarm != '无'
                            ? { color: 'red' }
                            : { color: '#000' }
                        "
                      >
                        {{ item.alarm }}
                      </span>
                    </li>
                    <li>
                      报警值:<span
                        :style="
                          item.alarm != '无'
                            ? { color: 'red' }
                            : { color: '#000' }
                        "
                      >
                        {{ item.value }}
                      </span>
                    </li>
                    <li>
                      报警时间:<span
                        :style="
                          item.alarm != '无'
                            ? { color: 'red' }
                            : { color: '#000' }
                        "
                      >
                        {{ item.time }}
                      </span>
                    </li>
                  </ul>
                </div>
              </el-col>
            </el-row>

            <div
              v-if="
                dSid == '22' || dSid == '23' || dSid == '25' || dSid == '26'
              "
              style="margin-top: 10px"
            >
              <div
                class="stateDate"
                style="text-align: center; font-weight: 800"
              >
                灭火器状态：{{
                  getFireStateList == "0"
                    ? "未启动"
                    : getFireStateList == "1"
                    ? "已启动"
                    : "未接入"
                }}
              </div>
              <div class="stateDate">
                <el-row>
                  <el-col :span="8">
                    <!-- <img src="../../../assets/images/gonglu.png" alt="" srcset="" /> -->
                    无功功率： {{ getNonphasekwList.nonphasekw || 0 }}W
                  </el-col>
                  <el-col :span="8">
                    功率因素： {{ getNonphasekwList.powerParam || 0 }}</el-col
                  >
                  <el-col :span="8">
                    电量：{{ getNonphasekwList.phasepowerkw || 0 }}kW·h
                  </el-col>
                  <el-col :span="8">
                    漏电：{{ getNonphasekwList.electric_num || 0 }}次
                  </el-col>
                  <el-col :span="8">
                    过流：{{ getNonphasekwList.o_current_num || 0 }}次
                  </el-col>
                  <el-col :span="8">
                    过压：{{ getNonphasekwList.o_voltage_num || 0 }}次
                  </el-col>
                  <el-col :span="8">
                    欠压：{{ getNonphasekwList.u_voltage_num || 0 }}次
                  </el-col>
                  <el-col :span="8">
                    断电：{{ getNonphasekwList.p_failure_num || 0 }}次
                  </el-col>
                  <el-col :span="8">
                    短路：{{ getNonphasekwList.SCCount || 0 }}次
                  </el-col>
                  <el-col :span="8">
                    老化：{{ getNonphasekwList.ageingCount || 0 }}次
                  </el-col>
                </el-row>
              </div>
            </div>

            <div class="one_echarts">
              <p class="titleP">电流统计图</p>
              <div id="echarts_wapper_one_search"></div>
            </div>
            <div class="one_echarts">
              <p class="titleP">温度统计图</p>
              <div id="echarts_wapper_two_search"></div>
            </div>
            <div class="one_echarts">
              <p class="titleP">电压统计图</p>
              <div id="echarts_wapper_three_search"></div>
            </div>
            <div class="four_echarts">
              <p class="titleP">图片</p>
              <div class="echarts_wapper_four_search">
                <el-row :gutter="50">
                  <!-- {{ item }} -->
                  <el-col
                    :span="8"
                    v-for="(item, index) in ElecDataList_images"
                    :key="index"
                  >
                    <div>
                      <el-image
                        style="width: 100%; height: 150px"
                        :src="item"
                        :preview-src-list="ElecDataList_images"
                      >
                      </el-image>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-dialog>

    <el-dialog
      v-model="dataVisible"
      :title="faultState ? '历史报警' : '当前报警'"
      width="50%"
    >
      <div v-if="faultState">
        <el-form
          size="mini"
          :inline="true"
          :model="formInline"
          class="demo-form-inline"
        >
          <el-form-item label="日期:">
            <el-col :span="24">
              <el-date-picker
                type="date"
                placeholder="时间"
                v-model="formInline.date1"
                value-format="yyyy-MM-dd"
                style="width: 100%"
              ></el-date-picker>
            </el-col>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="Historical_alarm()"
              >查询</el-button
            >
            <!-- <el-button type="primary" @click="onSubmit">导出</el-button> -->
          </el-form-item>
        </el-form>
        <el-table
          height="400px"
          :data="Historical_alarm_list"
          style="width: 100%"
          v-loading="loading1"
          element-loading-text="Loading..."
          :element-loading-spinner="svg"
          element-loading-svg-view-box="-10, -10, 50, 50"
          element-loading-background="rgba(4, 19, 54)"
          :default-sort="{
            prop: 'regdate',
            order: 'descending',
          }"
        >
          <el-table-column prop="type" label="报警名称"> </el-table-column>
          <el-table-column prop="regdate" label="报警时间" sortable>
          </el-table-column>
          <el-table-column prop="leakageAlarmCurrentValue" label="报警值">
          </el-table-column>
        </el-table>
      </div>
      <div v-else>
        <el-table
          height="400px"
          :data="AlarmAndFaultList"
          style="width: 100%"
          v-loading="loading1"
          element-loading-text="Loading..."
          :element-loading-spinner="svg"
          element-loading-svg-view-box="-10, -10, 50, 50"
          element-loading-background="rgba(4, 19, 54)"
          :default-sort="{
            prop: 'regdate',
            order: 'descending',
          }"
        >
          <el-table-column type="index" width="50"> </el-table-column>
          <el-table-column prop="typeName" label="报警名称"> </el-table-column>
          <el-table-column prop="alarmFaultDate" label="报警时间" sortable>
          </el-table-column>
          <el-table-column label="操作">
            <template #default="scope">
              <el-button
                @click="FaultHandleClick(scope.row.aFid)"
                type="text"
                size="small"
                >解除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>
    <el-dialog v-model="setVisible" title="设备设置" width="50%">
      <el-row>
        <el-col :span="6">
          <div class="shezhi_left">
            <p class="titleP">设备信息</p>
            <ul v-for="(item, index) in ElecDataList.DevData" :key="index">
              <li>
                设备编号: <span> {{ item.productNumber }}</span>
              </li>
              <li>
                保险单号:
                <span>{{
                  item.policy == "0" ? "暂无保险单号" : item.policy
                }}</span>
              </li>
              <li>
                开启流量:
                <span>{{ item.flow == "0" ? "否" : "item.flow" }}</span>
              </li>
              <li>是否授权: <span>否</span></li>
            </ul>
          </div>
        </el-col>
        <el-col :span="18">
          <div class="shizhi_right">
            <div
              class="right_one"
              v-if="
                dSid != '22' || dSid != '23' || dSid != '25' || dSid != '26'
              "
            >
              <p class="titleP">设备开关</p>
              <el-row
                :gutter="20"
                type="flex"
                class="row-bg"
                justify="space-around"
              >
                <el-col :span="8">
                  <el-button @click="shebeiBtn('1')"
                    >远程断电</el-button
                  ></el-col
                >
                <el-col :span="8">
                  <el-button @click="shebeiBtn('2')"
                    >远程开机</el-button
                  ></el-col
                >
                <el-col :span="8">
                  <el-button @click="shebeiBtn('3')"
                    >远程关机</el-button
                  ></el-col
                >
              </el-row>
              <el-row :gutter="20" class="row-bg">
                <el-col :span="8">
                  <el-button @click="shebeiBtn('4')"
                    >开启蜂鸣器</el-button
                  ></el-col
                >
                <el-col :span="8">
                  <el-button @click="shebeiBtn('5')"
                    >关闭蜂鸣器</el-button
                  ></el-col
                >
                <el-col :span="8">
                  <el-button @click="shebeiBtn('6')"
                    >远程消音</el-button
                  ></el-col
                >
              </el-row>
              <el-row :gutter="20" class="row-bg">
                <el-col :span="8">
                  <el-button @click="shebeiBtn('7')"
                    >开启流量</el-button
                  ></el-col
                >
                <el-col :span="8">
                  <el-button @click="shebeiBtn('8')"
                    >远程复位</el-button
                  ></el-col
                >
                <el-col :span="8">
                  <el-button @click="shebeiBtn('9')">授权</el-button></el-col
                >
              </el-row>
              <el-row :gutter="20" class="row-bg">
                <el-col :span="8">
                  <el-button @click="shebeiBtn('10')"
                    >开启屏蔽器</el-button
                  ></el-col
                >
                <el-col :span="8">
                  <el-button @click="shebeiBtn('11')">下发保险单</el-button>
                </el-col>
                <el-col :span="8">
                  <el-input
                    placeholder="请输入保险单号"
                    v-model="baoxiandanhao"
                  ></el-input>
                </el-col>

                <!-- <el-col :span="8"> <el-button>远程关机</el-button></el-col> -->
              </el-row>
            </div>
            <div class="right_one" v-else>
              <p class="titleP">设备开关</p>
              <el-row
                :gutter="20"
                type="flex"
                class="row-bg"
                justify="space-around"
              >
                <el-col :span="8">
                  <el-button @click="shebeiBtn('1')"
                    >远程分闸</el-button
                  ></el-col
                >
                <el-col :span="8">
                  <el-button @click="shebeiBtn('2')"
                    >远程合闸</el-button
                  ></el-col
                >
                <el-col :span="8">
                  <el-button @click="shebeiBtn('8')"
                    >远程复位</el-button
                  ></el-col
                >
                <!-- <el-col :span="8">
                  <el-button @click="shebeiBtn('3')"
                    >远程关机</el-button
                  ></el-col
                > -->
              </el-row>
              <el-row :gutter="20" class="row-bg">
                <el-col :span="8">
                  <el-button @click="shebeiBtn('4')"
                    >开启蜂鸣器</el-button
                  ></el-col
                >
                <el-col :span="8">
                  <el-button @click="shebeiBtn('5')"
                    >关闭蜂鸣器</el-button
                  ></el-col
                >
                <el-col :span="8">
                  <el-button @click="shebeiBtn('6')"
                    >远程消音</el-button
                  ></el-col
                >
              </el-row>
              <el-row :gutter="20" class="row-bg">
                <el-col :span="8" style="text-align: center">
                  <!-- <el-button @click="shebeiBtn('7')"
                    >灭火器启动</el-button
                  > -->

                  烟雾报警自动分闸:
                  <el-switch
                    v-model="fireExtinguisher1"
                    active-color="#13ce66"
                    inactive-color="#999"
                    @change="fireExtinguisherStateChange($event, 1)"
                  >
                  </el-switch>
                </el-col>
                <el-col :span="8" style="text-align: center">
                  <!-- <el-button @click="shebeiBtn('7')"
                    >灭火器启动</el-button
                  > -->

                  灭火器启动:
                  <el-switch
                    v-model="fireExtinguisher2"
                    active-color="#13ce66"
                    inactive-color="#999"
                    @change="fireExtinguisherStateChange($event, 2)"
                    :disabled="getFireStateList == '2' ? true : false"
                  >
                  </el-switch>
                </el-col>

                <el-col :span="8" style="text-align: center">
                  <!-- <el-button @click="shebeiBtn('9')"
                    >灭火器输出关闭</el-button
                  > -->

                  灭火器自动启动:
                  <el-switch
                    v-model="fireExtinguisher3"
                    active-color="#13ce66"
                    inactive-color="#999"
                    @change="fireExtinguisherStateChange($event, 3)"
                    :disabled="getFireStateList == '2' ? true : false"
                  >
                  </el-switch>
                </el-col>

                <!-- <el-col :span="8">
                  <el-button @click="shebeiBtn('12')"
                    >烟雾报警自动分闸开启</el-button
                  ></el-col
                > -->
              </el-row>

              <el-row :gutter="20" class="row-bg">
                <el-col :span="8" style="text-align: center">
                  <!-- <el-button @click="shebeiBtn('14')"
                    >火焰报警自动分闸开启</el-button
                  > -->

                  火焰报警自动分闸:
                  <el-switch
                    v-model="fireExtinguisher4"
                    active-color="#13ce66"
                    inactive-color="#999"
                    @change="fireExtinguisherStateChange($event, 4)"
                  >
                  </el-switch>
                </el-col>
              </el-row>
            </div>
            <div
              class="right_two"
              v-if="
                dSid == '22' || dSid == '23' || dSid == '25' || dSid == '26'
              "
            >
              <p class="titleP">设备状态</p>

              <el-row :gutter="20">
                <el-col :span="8">
                  <div
                    v-if="
                      (ParaState.devstatus == 1 && ParaState.dSid == '26') ||
                      (ParaState.start == 0 && ParaState.dSid == '26')
                    "
                    style="
                      background: #5f5b5b;
                      height: 30px;
                      margin: 10px;
                      line-height: 30px;
                      text-align: center;
                      color: #fff;
                    "
                  >
                    当前状态：分闸
                  </div>
                  <div
                    v-else
                    style="
                      background: #3694e4;

                      height: 30px;
                      margin: 10px;
                      line-height: 30px;
                      text-align: center;
                      color: #fff;
                    "
                  >
                    当前状态：合闸
                  </div>
                </el-col>
                <el-col :span="8">
                  <div
                    v-for="(item, index) in ElecDataList.DevData"
                    :key="index"
                  >
                    <div
                      v-if="item.status == '离线'"
                      style="
                        background: red;
                        height: 30px;
                        margin: 10px;
                        line-height: 30px;
                        text-align: center;
                        color: #fff;
                      "
                    >
                      设备离线
                    </div>
                    <div
                      v-else
                      style="
                        background: #2ace2a;
                        height: 30px;
                        margin: 10px;
                        line-height: 30px;
                        text-align: center;
                        color: #fff;
                      "
                    >
                      设备在线
                    </div>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div
                    style="
                      background: #3694e4;
                      height: 30px;
                      margin: 10px;
                      line-height: 30px;
                      text-align: center;
                      color: #fff;
                    "
                  >
                    灭火器状态：{{
                      getFireStateList == "0"
                        ? "未启动"
                        : getFireStateList == "1"
                        ? "已启动"
                        : "未接入"
                    }}
                  </div>
                </el-col>
              </el-row>
            </div>

            <div class="right_two">
              <p class="titleP">设置</p>
              <div class="tabs">
                <el-tabs v-model="activeName" class="demo-tabs">
                  <template v-if="dSid == 25 || dSid == 26">
                    <el-tab-pane label="阀值设置" class="tabs_one" name="first">
                      <el-row :gutter="20">
                        <el-col :span="12">
                          <p>漏电电流/mA</p>
                          <el-input
                            v-model="fazhishezhi.SYDL"
                            size="mini"
                            placeholder="请输入内容"
                          ></el-input>
                        </el-col>
                        <el-col :span="12"
                          ><p>电流过流/A</p>
                          <el-input
                            v-model="fazhishezhi.AXDL"
                            size="mini"
                            placeholder="请输入内容"
                          ></el-input
                        ></el-col>
                        <!-- <el-col :span="12"
                        ><p>A相温度/℃</p>
                        <el-input
                          v-model="fazhishezhi.AXWD"
                          size="mini"
                          placeholder="请输入内容"
                        ></el-input
                      ></el-col> -->
                      </el-row>
                      <el-row :gutter="20">
                        <el-col :span="12">
                          <p>
                            {{
                              ParaState.dSid == "26" ? "A温度/℃  " : "L温度/℃  "
                            }}
                          </p>
                          <el-input
                            v-model="fazhishezhi.AXWD"
                            size="mini"
                            placeholder="请输入内容"
                          ></el-input>
                        </el-col>
                        <el-col :span="12"
                          ><p>N温度/℃</p>
                          <el-input
                            v-model="fazhishezhi.NXWD"
                            size="mini"
                            placeholder="请输入内容"
                          ></el-input
                        ></el-col>
                      </el-row>
                      <el-row :gutter="20" v-if="ParaState.dSid == '26'">
                        <el-col :span="12">
                          <p>B温度/℃</p>
                          <el-input
                            v-model="fazhishezhi.parEleven"
                            size="mini"
                            placeholder="请输入内容"
                          ></el-input>
                        </el-col>
                        <el-col :span="12"
                          ><p>C温度/℃</p>
                          <el-input
                            v-model="fazhishezhi.parTwelve"
                            size="mini"
                            placeholder="请输入内容"
                          ></el-input
                        ></el-col>
                      </el-row>
                      <el-row :gutter="20">
                        <el-col :span="12">
                          <p>电压过压/V</p>
                          <el-input
                            v-model="fazhishezhi.BXDL"
                            size="mini"
                            placeholder="请输入内容"
                          ></el-input>
                        </el-col>
                        <el-col :span="12"
                          ><p>电压欠压/V</p>
                          <el-input
                            v-model="fazhishezhi.CXDL"
                            size="mini"
                            placeholder="请输入内容"
                          ></el-input
                        ></el-col>
                      </el-row>
                      <!-- <el-row :gutter="20">
                      <el-col :span="12">
                        <p>A相电压/V</p>
                        <el-input
                          v-model="fazhishezhi.AXDY"
                          size="mini"
                          placeholder="请输入内容"
                        ></el-input>
                      </el-col>
                      <el-col :span="12"
                        ><p>B相电压/V</p>
                        <el-input
                          v-model="fazhishezhi.BXDY"
                          size="mini"
                          placeholder="请输入内容"
                        ></el-input
                      ></el-col>
                    </el-row> -->
                      <!-- <el-row :gutter="20">
                      <el-col :span="12">
                        <p>C相电压/V</p>
                        <el-input
                          v-model="fazhishezhi.CXDY"
                          size="mini"
                          placeholder="请输入内容"
                        ></el-input>
                      </el-col>
                    </el-row> -->
                      <el-row type="flex" justify="center">
                        <el-col :span="4"
                          ><el-button size="mini" @click="offInfo"
                            >取消</el-button
                          ></el-col
                        >
                        <el-col :span="4"
                          ><el-button
                            type="primary"
                            size="mini"
                            @click="SetParameterApiFun"
                            >保存</el-button
                          ></el-col
                        >
                      </el-row>
                    </el-tab-pane>
                  </template>
                  <template v-else>
                    <el-tab-pane label="阀值设置" class="tabs_one" name="first">
                      <el-row :gutter="20">
                        <el-col :span="12">
                          <p>剩余电流/mA</p>
                          <el-input
                            v-model="fazhishezhi.SYDL"
                            size="mini"
                            placeholder="请输入内容"
                          ></el-input>
                        </el-col>
                        <el-col :span="12"
                          ><p>A相温度/℃</p>
                          <el-input
                            v-model="fazhishezhi.AXWD"
                            size="mini"
                            placeholder="请输入内容"
                          ></el-input
                        ></el-col>
                      </el-row>
                      <el-row :gutter="20">
                        <el-col :span="12">
                          <p>B相温度/℃</p>
                          <el-input
                            v-model="fazhishezhi.BXWD"
                            size="mini"
                            placeholder="请输入内容"
                          ></el-input>
                        </el-col>
                        <el-col :span="12"
                          ><p>C相温度/℃</p>
                          <el-input
                            v-model="fazhishezhi.CXWD"
                            size="mini"
                            placeholder="请输入内容"
                          ></el-input
                        ></el-col>
                      </el-row>
                      <el-row :gutter="20">
                        <el-col :span="12">
                          <p>N相温度/℃</p>
                          <el-input
                            v-model="fazhishezhi.NXWD"
                            size="mini"
                            placeholder="请输入内容"
                          ></el-input>
                        </el-col>
                        <el-col :span="12"
                          ><p>A相电流/A</p>
                          <el-input
                            v-model="fazhishezhi.AXDL"
                            size="mini"
                            placeholder="请输入内容"
                          ></el-input
                        ></el-col>
                      </el-row>
                      <el-row :gutter="20">
                        <el-col :span="12">
                          <p>B相电流/A</p>
                          <el-input
                            v-model="fazhishezhi.BXDL"
                            size="mini"
                            placeholder="请输入内容"
                          ></el-input>
                        </el-col>
                        <el-col :span="12"
                          ><p>C相电流/A</p>
                          <el-input
                            v-model="fazhishezhi.CXDL"
                            size="mini"
                            placeholder="请输入内容"
                          ></el-input
                        ></el-col>
                      </el-row>
                      <el-row :gutter="20">
                        <el-col :span="12">
                          <p>A相电压/V</p>
                          <el-input
                            v-model="fazhishezhi.AXDY"
                            size="mini"
                            placeholder="请输入内容"
                          ></el-input>
                        </el-col>
                        <el-col :span="12"
                          ><p>B相电压/V</p>
                          <el-input
                            v-model="fazhishezhi.BXDY"
                            size="mini"
                            placeholder="请输入内容"
                          ></el-input
                        ></el-col>
                      </el-row>
                      <el-row :gutter="20">
                        <el-col :span="12">
                          <p>C相电压/V</p>
                          <el-input
                            v-model="fazhishezhi.CXDY"
                            size="mini"
                            placeholder="请输入内容"
                          ></el-input>
                        </el-col>
                      </el-row>
                      <el-row type="flex" justify="center">
                        <el-col :span="4"
                          ><el-button size="mini">取消</el-button></el-col
                        >
                        <el-col :span="4"
                          ><el-button
                            type="primary"
                            size="mini"
                            @click="SetParameterApiFun"
                            >保存</el-button
                          ></el-col
                        >
                      </el-row>
                    </el-tab-pane>
                  </template>
                  <el-tab-pane
                    label="报警推送方式"
                    name="second"
                    style="text-align: center"
                  >
                    <p>设备状态</p>
                    <el-checkbox-group v-model="checkList">
                      <el-checkbox label="App">App</el-checkbox>
                      <el-checkbox label="短信">短信</el-checkbox>
                      <el-checkbox label="电话">电话</el-checkbox>
                    </el-checkbox-group>
                    <el-button
                      type="primary"
                      size="mini"
                      @click="baojingtuisong"
                      style="width: 50%"
                      >确定</el-button
                    >
                  </el-tab-pane>

                  <el-tab-pane label="设备历史故障" name="third">
                    <el-form
                      size="mini"
                      :inline="true"
                      :model="formInline"
                      class="demo-form-inline"
                    >
                      <el-form-item label="日期:">
                        <el-date-picker
                          v-model="DeviceHistory"
                          type="datetimerange"
                          range-separator="至"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期"
                          format="YYYY-MM-DD HH:mm:ss"
                          value-format="YYYY-MM-DD HH:mm:ss"
                        >
                        </el-date-picker>
                      </el-form-item>

                      <el-form-item>
                        <el-button type="primary" @click="deviceHistory('故障')"
                          >查询</el-button
                        >
                      </el-form-item>
                    </el-form>

                    <el-table :data="tableData" style="width: 100%">
                      <el-table-column prop="date" label="日期" width="180">
                      </el-table-column>
                      <el-table-column prop="name" label="姓名" width="180">
                      </el-table-column>
                      <el-table-column prop="address" label="地址">
                      </el-table-column>
                    </el-table>
                  </el-tab-pane>
                  <el-tab-pane label="设置操作记录" name="fourth">
                    <el-form
                      size="mini"
                      :inline="true"
                      :model="formInline"
                      class="demo-form-inline"
                    >
                      <el-form-item label="日期:">
                        <div class="block">
                          <el-date-picker
                            v-model="DeviceHistory"
                            type="datetimerange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            format="YYYY-MM-DD HH:mm:ss"
                            value-format="YYYY-MM-DD HH:mm:ss"
                          >
                          </el-date-picker>
                        </div>
                      </el-form-item>

                      <el-form-item>
                        <el-button type="primary" @click="deviceHistory('操作')"
                          >查询</el-button
                        >
                      </el-form-item>
                    </el-form>

                    <el-table :data="caozuojilv" style="width: 100%">
                      <el-table-column type="index" width="50">
                      </el-table-column>
                      <el-table-column prop="user_name" label="用户账号">
                      </el-table-column>
                      <el-table-column prop="date" label="操作时间">
                      </el-table-column>
                      <el-table-column prop="info" label="操作内容">
                      </el-table-column>
                    </el-table>
                  </el-tab-pane>
                </el-tabs>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import {
  ElecData_type,
  getDeviceByDevId,
  ReadParameterApi,
  ElectricDeviceDate,
  getHistDeviceAlarm,
  getAlarmAndFault,
  WebeditFileimageServlet,
  resetclose,
  putMessToDeviceOn,
  resetclosefuwei,
  insertClouddog,
  putMessToDevice,
  updateShutdown,
  SetParameterApiCopyFire,
  SetParameterApi,
  UpdateDevicePush,
  getHistoryFault,
  getUserInfo,
  getFireState,
  getNonphasekw,
  getParaState,
  upSwitch,
} from "@/api/index2";
import * as echarts from "echarts";
import { ref, defineExpose, reactive, watch } from "vue";
import { ElMessageBox, ElMessage } from "element-plus";
const userName = sessionStorage.getItem("userName");
const ElecDataList: any = ref([]);
const infoData: any = ref([]);
const getDeviceByDevIdList: any = ref([]);
const Historical_alarm_list: any = ref([]);
const ReadParameterApiList: any = ref([]);
const tableData: any = ref([]);
const dialogVisible = ref(false);
const dataVisible = ref(false);
const setVisible = ref(false);
const baoxiandanhao = ref();
const caozuojilv = ref();
const dSid = ref();
const checkList = ref();
const getFireStateList = ref();
const DeviceHistory = ref();
const ParaState = ref({});

const getNonphasekwList = ref({});
const ElecDataList_images: any = ref([]);
const AlarmAndFaultList: any = ref([]);
const setList: any = ref([]);
const loading = ref(true);
const faultState = ref(true);
const loading1 = ref(true);
const formInline = reactive({
  date1: "",
  region: "",
});
const fazhishezhi = reactive({
  SYDL: "",
  AXDL: "",
  BXDL: "",
  CXDL: "",
  AXWD: "",
  BXWD: "",
  CXWD: "",
  NXWD: "",
  AXDY: "",
  BXDY: "",
  CXDY: "",
  parEleven: "",
  parTwelve: "",
});
const svg = `
        <path class="path" d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
      `;

const activeName = ref("");
watch(
  () => activeName.value,
  (value, old) => {
    console.log(value, 999);

    if (value == "first") {
      const row = ReadParameterApiList.value;

      // setList.value = [
      //   { name: "剩余电流/mA", value: fazhishezhi.SYDL },
      //   { name: "A相温度/℃", value: fazhishezhi.AXWD },
      //   { name: "B相温度/℃", value: fazhishezhi.BXWD },
      //   { name: "C相温度/℃", value: fazhishezhi.CXWD },
      //   { name: "N相温度/℃", value: fazhishezhi.NXWD },
      //   { name: "A相电流/A", value: fazhishezhi.AXDL },
      //   { name: "B相电流/A", value: fazhishezhi.BXDL },
      //   { name: "C相电流/A", value: fazhishezhi.CXDL },
      //   { name: "A相电压/V", value: fazhishezhi.AXDY },
      //   { name: "B相电压/V", value: fazhishezhi.BXDY },
      //   { name: "C相电压/V", value: fazhishezhi.CXDY },
      // ];

      fazhishezhi.AXWD = row.AWenDu;
      fazhishezhi.BXWD = row.BWenDu;
      fazhishezhi.CXWD = row.CWenDu;
      fazhishezhi.NXWD = row.NWenDu;
      fazhishezhi.SYDL = row.SYdianliu;
      fazhishezhi.AXDL = row.ADianLiu;
      fazhishezhi.BXDL = row.BDianLiu;
      fazhishezhi.CXDL = row.CDianLiu;
      fazhishezhi.AXDY = row.ADianYa;
      fazhishezhi.BXDY = row.BDianYa;
      fazhishezhi.CXDY = row.CDianYa;
    }
  }
);
const getFireStateFun = () => {
  getFireState(ElecDataList.value.DevData[0].productNumber).then((res) => {
    console.log(res, 9999);
    getFireStateList.value = res.data.data;
  });
  //功率因素
  getNonphasekw(ElecDataList.value.DevData[0].productNumber).then((res) => {
    console.log(res, "woshjres1321321esada");
    getNonphasekwList.value = res.data.data;
  });
  getParaState(userName, ElecDataList.value.DevData[0].productNumber).then(
    (res) => {
      ParaState.value = res.data.data;
    }
  );
};

const ElecData_typeFun = (devId: any, type: number) => {
  ElecData_type(devId, type).then((res) => {
    // loading.value = false;
    if (res.data != "") {
      ElecDataList.value = res.data;
      dSid.value = res.data.DevData[0].dSid;
      console.log(res.data, 33333);
      ReadParameterApiFun();
      loading.value = false;
      if (res.data.DevData.length > 0) {
        if (res.data.DevData[0].image != "") {
          const list = res.data.DevData[0].image.split(",");
          list.forEach((Element: any) => {
            // Element =
            let a = "http://edog-online.com/ctx/devPic/" + Element;
            ElecDataList_images.value.push(a);
          });
        }
      }

      if (
        dSid.value == 22 ||
        dSid.value == 23 ||
        dSid.value == 25 ||
        dSid.value == 26
      ) {
        getFireStateFun();
      }
    }
  });
};
const SetParameterApiFun = () => {
  // console.log(fazhishezhi.SYDL, 666);
  if (dSid.value == 25 || dSid.value == 26) {
    SetParameterApi(
      ElecDataList.value.DevData[0].productNumber,
      fazhishezhi.SYDL,
      fazhishezhi.AXDL,
      fazhishezhi.BXDL,
      fazhishezhi.AXWD,
      fazhishezhi.NXWD,
      fazhishezhi.CXDL,
      fazhishezhi.parEleven,
      fazhishezhi.parTwelve
    ).then((res) => {
      if (res.data.status == 1) {
        //  ElMessage.success("设置成功");
        ElMessage({
          showClose: true,
          message: "设置成功",
          type: "success",
        });
      } else {
        ElMessage({
          showClose: true,
          message: "设置失败",
          type: "error",
        });
      }
    });
  } else {
    SetParameterApiCopyFire(
      ElecDataList.value.DevData[0].productNumber,
      fazhishezhi.SYDL,
      fazhishezhi.AXWD,
      fazhishezhi.BXWD,
      fazhishezhi.CXWD,
      fazhishezhi.NXWD,
      fazhishezhi.AXDL,
      fazhishezhi.BXDL,
      fazhishezhi.CXDL,
      fazhishezhi.AXDY,
      fazhishezhi.BXDY,
      fazhishezhi.CXDY
    ).then((res) => {
      if (res.data.status == 1) {
        //  ElMessage.success("设置成功");
        ElMessage({
          showClose: true,
          message: "设置成功",
          type: "success",
        });
      } else {
        ElMessage({
          showClose: true,
          message: "设置失败",
          type: "error",
        });
      }
    });
  }
};
const deviceHistory = (type) => {
  if (type == "故障") {
    getHistoryFault(
      ElecDataList.value.DevData[0].productNumber,
      DeviceHistory.value == undefined ? "" : DeviceHistory.value[0],
      DeviceHistory.value == undefined ? "" : DeviceHistory.value[1]
    ).then((res) => {
      if (res.data.length <= 0) {
        ElMessage({
          showClose: true,
          type: "error",
          message: "暂无历史数据",
        });
      }
      tableData.value = res.data;
    });
  } else {
    getUserInfo(
      "",
      "",
      ElecDataList.value.DevData[0].productNumber,
      DeviceHistory.value == undefined ? "" : DeviceHistory.value[0],
      DeviceHistory.value == undefined ? "" : DeviceHistory.value[1]
    ).then(
      (res) => {
        if (res.data.length == 0) {
          return ElMessage({
            showClose: true,
            type: "error",
            message: "暂无历史数据",
          });
        }
        caozuojilv.value = res.data;
      },
      () => {
        ElMessage({
          showClose: true,
          type: "error",
          message: "请稍后重试或联系管理员",
        });
      }
    );
  }
};
const FaultHandleClick = (aFid) => {
  ElMessageBox.prompt("请填写处置情况", "解除报警", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
  }).then(({ value }) => {
    WebeditFileimageServlet(userName + "," + aFid, value).then((res) => {
      // console.log(res.data);
      if (res.data == null || res.data == undefined || res.data == "") {
        return ElMessage({
          type: "error",
          message: "请稍后重试或联系管理员",
          showClose: true,
        });
      }
      if (res.data.list[0].status == true) {
        // this.innerVisible = false;
        // this.SmartIndependentSmokeDialog = false;
        getAlarmAndFaultFun();
        return ElMessage({
          type: "success",
          message: "解除报警成功",
          showClose: true,
        });
      }
    });
  });
};
const getAlarmAndFaultFun = () => {
  loading1.value = true;
  faultState.value = false;
  getAlarmAndFault(ElecDataList.value.DevData[0].productNumber).then((res) => {
    AlarmAndFaultList.value = res.data.data;
    loading1.value = false;
  });
};
const Historical_alarm = () => {
  loading1.value = true;
  const time = new Date();
  const year = time.getFullYear();
  const month = time.getMonth() + 1;
  const day = time.getDate();
  let now = year + "-" + month + "-" + day;
  if (formInline.date1 != "") {
    now = formInline.date1;
  }
  // console.log(this.sizeForm.date1, 987987);
  getHistDeviceAlarm(ElecDataList.value.DevData[0].productNumber, now).then(
    (res) => {
      loading1.value = false;
      // this.Historical_alarm_list_loading = false;
      if (res.data == "") {
        ElMessage({
          showClose: true,
          message: "暂无历史数据",
          type: "error",
        });
      }
      Historical_alarm_list.value = res.data.DevData;
    },
    () => {
      loading1.value = false;
      console.log(123);

      ElMessage({
        showClose: true,
        message: "请稍后重试或联系管理员",
        type: "error",
      });
      // ElMessage.error("请稍后重试或联系管理员");
    }
  );
};
const exportData = () => {
  window.open(
    `http://psy119.cn/earlyWarn/WebProject/PoiTemData?productNumber=${ElecDataList.value.DevData[0].productNumber}`
  );
};
const getDeviceByDevIdFun = (devId: any) => {
  console.log(321);

  getDeviceByDevId(devId).then((res) => {
    getDeviceByDevIdList.value = res.data.list[0];
  });
};
const baojingtuisong = () => {
  let app = 0;
  let sms = 0;
  let phone = 0;
  checkList.value.forEach((index, element) => {
    //console.log(index, element);
    if (index === "短信") {
      sms = 1;
    }
    if (index === "电话") {
      phone = 1;
    }
    if (index === "App") {
      app = 1;
    }
  });
  UpdateDevicePush(
    "undefined",
    app,
    userName,
    sms,
    ElecDataList.value.DevData[0].productNumber,
    phone
  ).then((res) => {
    //  ElMessage.success("修改成功");
    ElMessage({
      showClose: true,
      type: "success",
      message: "修改成功",
    });
  });
};
//设备设置按钮
const shebeiBtn = (num) => {
  const role = sessionStorage.getItem("role");
  const power = sessionStorage.getItem("power");
  if (
    dSid.value == 22 ||
    dSid.value == 23 ||
    dSid.value == 25 ||
    dSid.value == 26
  ) {
    switch (num) {
      //远程分闸
      case "1":
        if (role == "1000" || power.indexOf("10003003") != -1) {
          if (dSid.value == 26 || dSid.value == 25) {
            putMessToDeviceOn(
              userName,
              ElecDataList.value.DevData[0].productNumber,
              "poweroff"
            ).then(
              (res) => {
                if (res.data.message == "请求成功") {
                  getParaState(
                    userName,
                    ElecDataList.value.DevData[0].productNumber
                  ).then((res) => {
                    ParaState.value = res.data.data;
                    // console.log(this.ParaState, "==============");
                    // this.$parent.selectDeviceByNumberFun();
                  });

                  ElMessage.success(res.data.message);
                } else {
                  ElMessage.error(res.data.message);
                }
              },
              () => {
                ElMessage.error("请稍后重试或联系管理员");
              }
            );
          } else {
            upSwitch(ElecDataList.value.DevData[0].productNumber, 1, "").then(
              (res) => {
                if (res.data.code == "200") {
                  getParaState(
                    userName,
                    ElecDataList.value.DevData[0].productNumber
                  ).then((res) => {
                    ParaState.value = res.data.data;
                    // console.log(this.ParaState, "==============");
                    // this.$parent.selectDeviceByNumberFun();
                  });

                  ElMessage.success("请求成功");
                } else {
                  ElMessage.error("请求失败");
                }
              },
              () => {
                ElMessage.error("请稍后重试或联系管理员");
              }
            );
          }
        } else {
          ElMessage.error("暂无权限");
        }

        break;

      //远程合闸
      case "2":
        if (role == "1000" || power.indexOf("10003004") != -1) {
          // console.log(ParaState.value.dSid);
          if (dSid.value == "26" || dSid.value == 25) {
            console.log("-0-0-0-0-0-0-0--0-9-9");
            putMessToDeviceOn(
              userName,
              ElecDataList.value.DevData[0].productNumber,
              "poweron"
            ).then(
              (res) => {
                if (res.data.message == "请求成功") {
                  getParaState(
                    userName,
                    ElecDataList.value.DevData[0].productNumber
                  ).then((res) => {
                    ParaState.value = res.data.data;
                    // console.log(this.ParaState, "==============");
                    // this.$parent.selectDeviceByNumberFun();
                  });

                  ElMessage.success(res.data.message);
                } else {
                  ElMessage.error(res.data.message);
                }
              },
              () => {
                ElMessage.error("请稍后重试或联系管理员");
              }
            );
          } else {
            // console.log("-0-0-0-0-0-0-0--0");
            upSwitch(ElecDataList.value.DevData[0].productNumber, 2, "").then(
              (res) => {
                if (res.data.code == "200") {
                  getParaState(
                    userName,
                    ElecDataList.value.DevData[0].productNumber
                  ).then((res) => {
                    ParaState.value = res.data.data;
                    // console.log(this.ParaState, "==============");
                    // this.$parent.selectDeviceByNumberFun();
                  });

                  ElMessage.success("请求成功");
                } else {
                  ElMessage.error("请求失败");
                }
              },
              () => {
                ElMessage.error("请稍后重试或联系管理员");
              }
            );
          }
        } else {
          ElMessage.error("暂无权限");
        }
        break;
      //远程分闸
      case "3":
        if (role == "1000" || power.indexOf("10003004") != -1) {
          putMessToDeviceOn(
            userName,
            ElecDataList.value.DevData[0].productNumber,
            "startup"
          ).then(
            (res) => {
              if (res.data.message == "请求成功") {
                ElMessage.success(res.data.message);
              } else {
                ElMessage.error(res.data.message);
              }
            },
            () => {
              ElMessage.error("请稍后重试或联系管理员");
            }
          );
        } else {
          ElMessage.error("暂无权限");
        }
        break;
      //开启蜂鸣器
      case "4":
        console.log("99909090909090909090");
        if (role == "1000" || power.indexOf("10003004") != -1) {
          putMessToDeviceOn(
            userName,
            ElecDataList.value.DevData[0].productNumber,
            "voiceon"
          ).then(
            (res) => {
              if (res.data.message == "请求成功") {
                ElMessage.success(res.data.message);
              } else {
                ElMessage.error(res.data.message);
              }
            },
            () => {
              ElMessage.error("请稍后重试或联系管理员");
            }
          );
          break;
        } else {
          ElMessage.error("暂无权限");
        }
        break;
      //关闭蜂鸣器
      case "5":
        if (role == "1000" || power.indexOf("10003004") != -1) {
          putMessToDeviceOn(
            userName,
            ElecDataList.value.DevData[0].productNumber,
            "voiceoff"
          ).then(
            (res) => {
              if (res.data.message == "请求成功") {
                ElMessage.success(res.data.message);
              } else {
                ElMessage.error(res.data.message);
              }
            },
            () => {
              ElMessage.error("请稍后重试或联系管理员");
            }
          );
          break;
        } else {
          ElMessage.error("暂无权限");
        }
        break;
      //远程消音
      case "6":
        if (role == "1000" || power.indexOf("10003001") != -1) {
          putMessToDeviceOn(
            userName,
            ElecDataList.value.DevData[0].productNumber,
            "mute"
          ).then(
            (res) => {
              if (res.data.message == "请求成功") {
                ElMessage.success(res.data.message);
              } else {
                ElMessage.error(res.data.message);
              }
            },
            () => {
              ElMessage.error("请稍后重试或联系管理员");
            }
          );
        } else {
          ElMessage.error("暂无权限");
        }

        break;
      //灭火器启动
      case "7":
        if (role == "1000" || power.indexOf("10003004") != -1) {
          putMessToDeviceOn(
            userName,
            ElecDataList.value.DevData[0].productNumber,
            "firepoweron"
          ).then(
            (res) => {
              if (res.data.message == "请求成功") {
                ElMessage.success(res.data.message);
              } else {
                ElMessage.error(res.data.message);
              }
            },
            () => {
              ElMessage.error("请稍后重试或联系管理员");
            }
          );

          setTimeout(() => {
            getFireState(ElecDataList.value.DevData[0].productNumber).then(
              (res) => {
                console.log(res, 9999);
                getFireStateList.value = res.data.data;
              }
            );
          }, 3000);
          break;
        } else {
          ElMessage.error("暂无权限");
        }
        break;
      //远程复位
      case "8":
        if (role == "1000" || power.indexOf("10003003") != -1) {
          putMessToDeviceOn(
            userName,
            ElecDataList.value.DevData[0].productNumber,
            "reset"
          ).then(
            (res) => {
              if (res.data.status == "1") {
                ElMessage.success(res.data.message);
              } else {
                ElMessage.error(res.data.message);
              }
            },
            () => {
              ElMessage.error("请稍后重试或联系管理员");
            }
          );
        } else {
          ElMessage.error("暂无权限");
        }
        break;
      //灭火器输出关闭
      case "9":
        if (role == "1000" || power.indexOf("10003004") != -1) {
          putMessToDeviceOn(
            userName,
            ElecDataList.value.DevData[0].productNumber,
            "firepoweroff"
          ).then(
            (res) => {
              if (res.data.message == "请求成功") {
                ElMessage.success(res.data.message);
              } else {
                ElMessage.error(res.data.message);
              }
            },
            () => {
              ElMessage.error("请稍后重试或联系管理员");
            }
          );

          setTimeout(() => {
            getFireState(ElecDataList.value.DevData[0].productNumber).then(
              (res) => {
                console.log(res, 9999);
                getFireStateList.value = res.data.data;
              }
            );
          }, 3000);

          break;
        } else {
          ElMessage.error("暂无权限");
        }
        break;
      //灭火器自动启动打开
      case "10":
        if (role == "1000" || power.indexOf("10003004") != -1) {
          putMessToDeviceOn(
            userName,
            ElecDataList.value.DevData[0].productNumber,
            "fireon"
          ).then(
            (res) => {
              if (res.data.message == "请求成功") {
                ElMessage.success(res.data.message);
              } else {
                ElMessage.error(res.data.message);
              }
            },
            () => {
              ElMessage.error("请稍后重试或联系管理员");
            }
          );
          break;
        } else {
          ElMessage.error("暂无权限");
        }
        break;
      //灭火器自动启动关闭
      case "11":
        if (role == "1000" || power.indexOf("10003004") != -1) {
          putMessToDeviceOn(
            userName,
            ElecDataList.value.DevData[0].productNumber,
            "fireoff"
          ).then(
            (res) => {
              if (res.data.message == "请求成功") {
                ElMessage.success(res.data.message);
              } else {
                ElMessage.error(res.data.message);
              }
            },
            () => {
              ElMessage.error("请稍后重试或联系管理员");
            }
          );
          break;
        } else {
          ElMessage.error("暂无权限");
        }
        break;
      //烟雾报警自动分闸开启
      case "12":
        if (role == "1000" || power.indexOf("10003004") != -1) {
          putMessToDeviceOn(
            userName,
            ElecDataList.value.DevData[0].productNumber,
            "smokeon"
          ).then(
            (res) => {
              if (res.data.message == "请求成功") {
                ElMessage.success(res.data.message);
              } else {
                ElMessage.error(res.data.message);
              }
            },
            () => {
              ElMessage.error("请稍后重试或联系管理员");
            }
          );
          break;
        } else {
          ElMessage.error("暂无权限");
        }
        break;
      //烟雾报警自动分闸关闭
      case "13":
        if (role == "1000" || power.indexOf("10003004") != -1) {
          putMessToDeviceOn(
            userName,
            ElecDataList.value.DevData[0].productNumber,
            "smokeoff"
          ).then(
            (res) => {
              if (res.data.message == "请求成功") {
                ElMessage.success(res.data.message);
              } else {
                ElMessage.error(res.data.message);
              }
            },
            () => {
              ElMessage.error("请稍后重试或联系管理员");
            }
          );
          break;
        } else {
          ElMessage.error("暂无权限");
        }
        break;
      //火焰报警自动分闸开启
      case "14":
        if (role == "1000" || power.indexOf("10003004") != -1) {
          putMessToDeviceOn(
            userName,
            ElecDataList.value.DevData[0].productNumber,
            "flameon"
          ).then(
            (res) => {
              if (res.data.message == "请求成功") {
                ElMessage.success(res.data.message);
              } else {
                ElMessage.error(res.data.message);
              }
            },
            () => {
              ElMessage.error("请稍后重试或联系管理员");
            }
          );
          break;
        } else {
          ElMessage.error("暂无权限");
        }
        break;
      //火焰报警自动分闸关闭
      case "15":
        if (role == "1000" || power.indexOf("10003004") != -1) {
          putMessToDeviceOn(
            userName,
            ElecDataList.value.DevData[0].productNumber,
            "flameoff"
          ).then(
            (res) => {
              if (res.data.message == "请求成功") {
                ElMessage.success(res.data.message);
              } else {
                ElMessage.error(res.data.message);
              }
            },
            () => {
              ElMessage.error("请稍后重试或联系管理员");
            }
          );
          break;
        } else {
          ElMessage.error("暂无权限");
        }
        break;
    }
  } else {
    switch (num) {
      //远程断电
      case "1":
        if (role == "1000" || power.indexOf("10003003") != -1) {
          resetclose(ElecDataList.value.DevData[0].productNumber, 0).then(
            (res) => {
              if (res.data.message == "请求成功") {
                ElMessage.success(res.data.message);
              } else {
                ElMessage.error(res.data.message);
              }
            },
            () => {
              ElMessage.error("请稍后重试或联系管理员");
            }
          );
        } else {
          ElMessage.error("暂无权限");
        }

        break;

      //远程开机
      case "2":
        if (role == "1000" || power.indexOf("10003004") != -1) {
          putMessToDeviceOn(
            ElecDataList.value.DevData[0].productNumber,
            "shutdown"
          ).then(
            (res) => {
              if (res.data.message == "请求成功") {
                ElMessage.success(res.data.message);
              } else {
                ElMessage.error(res.data.message);
              }
            },
            () => {
              ElMessage.error("请稍后重试或联系管理员");
            }
          );
          break;
        } else {
          ElMessage.error("暂无权限");
        }
      //远程关机
      case "3":
        if (role == "1000" || power.indexOf("10003004") != -1) {
          putMessToDeviceOn(
            ElecDataList.value.DevData[0].productNumber,
            "startup"
          ).then(
            (res) => {
              if (res.data.message == "请求成功") {
                ElMessage.success(res.data.message);
              } else {
                ElMessage.error(res.data.message);
              }
            },
            () => {
              ElMessage.error("请稍后重试或联系管理员");
            }
          );
          break;
        } else {
          ElMessage.error("暂无权限");
        }
        break;
      //开启蜂鸣器
      case "4":
        if (role == "1000" || power.indexOf("10003004") != -1) {
          putMessToDeviceOn(
            ElecDataList.value.DevData[0].productNumber,
            "voiceon"
          ).then(
            (res) => {
              if (res.data.message == "请求成功") {
                ElMessage.success(res.data.message);
              } else {
                ElMessage.error(res.data.message);
              }
            },
            () => {
              ElMessage.error("请稍后重试或联系管理员");
            }
          );
          break;
        } else {
          ElMessage.error("暂无权限");
        }
        break;
      //关闭蜂鸣器
      case "5":
        if (role == "1000" || power.indexOf("10003004") != -1) {
          putMessToDeviceOn(
            ElecDataList.value.DevData[0].productNumber,
            "voiceoff"
          ).then(
            (res) => {
              if (res.data.message == "请求成功") {
                ElMessage.success(res.data.message);
              } else {
                ElMessage.error(res.data.message);
              }
            },
            () => {
              ElMessage.error("请稍后重试或联系管理员");
            }
          );
          break;
        } else {
          ElMessage.error("暂无权限");
        }
        break;
      //远程消音
      case "6":
        if (role == "1000" || power.indexOf("10003001") != -1) {
          resetclose(ElecDataList.value.DevData[0].productNumber, 2).then(
            (res) => {
              if (res.data.message == "请求成功") {
                ElMessage.success(res.data.message);
              } else {
                ElMessage.error(res.data.message);
              }
            },
            () => {
              ElMessage.error("请稍后重试或联系管理员");
            }
          );
        } else {
          ElMessage.error("暂无权限");
        }

        break;
      //开启流量
      case "7":
        if (role == "1000" || power.indexOf("10003004") != -1) {
          putMessToDeviceOn(
            ElecDataList.value.DevData[0].productNumber,
            "openflow"
          ).then(
            (res) => {
              if (res.data.message == "请求成功") {
                ElMessage.success(res.data.message);
              } else {
                ElMessage.error(res.data.message);
              }
            },
            () => {
              ElMessage.error("请稍后重试或联系管理员");
            }
          );
          break;
        } else {
          ElMessage.error("暂无权限");
        }
        break;
      //远程复位
      case "8":
        if (role == "1000" || power.indexOf("10003003") != -1) {
          resetclosefuwei(ElecDataList.value.DevData[0].productNumber, 2).then(
            (res) => {
              if (res.data.status == "1") {
                ElMessage.success(res.data.message);
              } else {
                ElMessage.error(res.data.message);
              }
            },
            () => {
              ElMessage.error("请稍后重试或联系管理员");
            }
          );
        } else {
          ElMessage.error("暂无权限");
        }
        break;
      //授权
      case "9":
        if (role == "1000" || power.indexOf("10003004") != -1) {
          insertClouddog(ElecDataList.value.DevData[0].productNumber).then(
            (res) => {
              if (res.data.list[0].status == "true") {
                ElMessage.success(
                  "授权成功.工作日一天后将授权生效,非工作日将延期"
                );
              } else {
                ElMessage.error("授权失败");
              }
            },
            () => {
              ElMessage.error("请稍后重试或联系管理员");
            }
          );
        }
        break;
      //开启屏蔽器
      case "10":
        if (role == "1000" || power.indexOf("10003013") != -1) {
          updateShutdown(
            ElecDataList.value.DevData[0].productNumber,

            userName
          ).then(
            (res) => {
              if (res.data.status == "true") {
                ElMessage.success(res.data.mess);
              } else {
                ElMessage.error(res.data.mess);
              }
            },
            () => {
              ElMessage.error("请稍后重试或联系管理员");
            }
          );
        }
        break;
      //下发保险单
      case "11":
        // //console.log(6554654);
        // //console.log( ElecDataList.value.DevData[0].productNumber, 789789);
        if (role == "1000" || power.indexOf("10003004") != -1) {
          putMessToDevice(
            ElecDataList.value.DevData[0].productNumber,
            baoxiandanhao.value
          ).then(
            (res) => {
              if (res.data.message == "请求成功") {
                alert("下发保险单号成功");
              } else {
                ElMessage.error("请稍后重试");
              }
            },
            () => {
              ElMessage.error("请稍后重试或联系管理员");
            }
          );
        }
        // var res = JSON.parse(result);
        // //console.log(res);

        break;
    }
  }
};
const handleClose = () => {
  var box2 = echarts.init(
    document.getElementById("echarts_wapper_two_search")!
  );
  box2.dispose();
  // type EChartsOption = echarts.EChartsOption;
  var box1 = echarts.init(
    document.getElementById("echarts_wapper_one_search")!
  );
  box1.dispose();
  var box3 = echarts.init(
    document.getElementById("echarts_wapper_three_search")!
  );
  box3.dispose();
  console.log("关闭");
  dialogVisible.value = false;
};
const ReadParameterApiFun = () => {
  ReadParameterApi(ElecDataList.value.DevData[0].productNumber).then((res) => {
    // console.log(res);
    ReadParameterApiList.value = res.data.row;
    let info =
      ElecDataList.value.DevData[0].typeName == "正常"
        ? getDeviceByDevIdList.value.mess2[0]
        : getDeviceByDevIdList.value.mess5[0];

    let alarmType = info.type;
    let value = "";
    let time = info.regdate;
    let flag1 = false;
    let flag2 = false;
    let flag3 = false;
    //   <!-- 漏电-剩余 -->
    if (
      info.info == "20" ||
      info.info == "25" ||
      info.info == "26" ||
      info.info == "27" ||
      (info.info == "0" && info.type.indexOf("漏电") != -1) ||
      (info.info == "0" && info.type.indexOf("剩余") != -1)
    ) {
      value = info.leakageAlarmCurrentValue + "mA";

      flag1 = true;
      //  温度-A,B,C,N
    } else if (
      info.info == "16" ||
      info.info == "21" ||
      info.info == "40" ||
      info.info == "41" ||
      (info.info == "0" && info.type.indexOf("N温度") != -1) ||
      info.info == "19" ||
      info.info == "35" ||
      info.info == "34" ||
      info.info == "24" ||
      (info.info == "0" && info.type.indexOf("A温度") != -1) ||
      info.info == "18" ||
      info.info == "23" ||
      info.info == "36" ||
      info.info == "37" ||
      (info.info == "0" && info.type.indexOf("B温度") != -1) ||
      info.info == "17" ||
      info.info == "22" ||
      info.info == "38" ||
      info.info == "39" ||
      (info.info == "0" && info.type.indexOf("C温度") != -1)
    ) {
      flag3 = true;
      if (info.type.indexOf("N") != -1) {
        value =
          info.temperatureAlarmNvalue == ""
            ? info.noAlarmNTemperatureValue + "℃"
            : info.temperatureAlarmNvalue + "℃";

        value = info.leakageAlarmCurrentValue + "mA";
      } else if (info.type.indexOf("A") != -1) {
        value =
          info.temperatureAlarmAvalue == ""
            ? info.noAlarmATemperatureValue + "℃"
            : info.temperatureAlarmAvalue + "℃";
      } else if (info.type.indexOf("B") != -1) {
        value =
          info.temperatureAlarmBvalue == ""
            ? info.noAlarmBTemperatureValue + "℃"
            : info.temperatureAlarmBvalue + "℃";
      } else {
        value =
          info.temperatureAlarmCvalue == ""
            ? info.noAlarmCTemperatureValue + "℃"
            : info.temperatureAlarmCvalue + "℃";
      }
      //   <!-- A电流-B电流-C电流 -->
    } else if (
      info.info == "3" ||
      info.info == "28" ||
      info.info == "29" ||
      (info.info == "0" && info.type.indexOf("A相电流") != -1) ||
      info.info == "2" ||
      info.info == "30" ||
      info.info == "31" ||
      (info.info == "0" && info.type.indexOf("B相电流") != -1) ||
      info.info == "1" ||
      info.info == "32" ||
      info.info == "33" ||
      (info.info == "0" && info.type.indexOf("C相电流") != -1)
    ) {
      flag1 = true;
      if (info.type.indexOf("A相电流") != -1) {
        value = `${info.currentAlarmAvalue}A`;
      } else if (info.type.indexOf("B相电流") != -1) {
        value = `${info.currentAlarmBvalue}A`;
      } else {
        value = `${info.currentAlarmCvalue}A`;
      }
      //   <!-- 电压-A,B,C -->
    } else if (
      info.info == "5" ||
      info.info == "8" ||
      info.info == "11" ||
      info.info == "14" ||
      (info.info == "0" && info.type.indexOf("A相电压") != -1) ||
      info.info == "6" ||
      info.info == "9" ||
      info.info == "12" ||
      info.info == "15" ||
      (info.info == "0" && info.type.indexOf("B相电压") != -1) ||
      info.info == "4" ||
      info.info == "7" ||
      info.info == "10" ||
      info.info == "13" ||
      (info.info == "0" && info.type.indexOf("C相电压") != -1)
    ) {
      flag2 = true;
      if (info.type.indexOf("A相电压") != -1) {
        value = `${info.noVoltageAlarmAValue}V`;
      } else if (info.type.indexOf("B相电压") != -1) {
        value = `${info.noVoltageAlarmBValue}V`;
      } else {
        value = `${info.noVoltageAlarmCValue}V`;
      }
    }
    infoData.value = [
      {
        A1: info.currentAlarmAvalue + "A",
        A2: res.data.row.ADianLiu + "A",
        B1: info.currentAlarmBvalue + "A",
        B2: res.data.row.BDianLiu + "A",
        C1: info.currentAlarmCvalue + "A",
        C2: res.data.row.CDianLiu + "A",
        D1: info.leakageAlarmCurrentValue + "mA",
        D2: res.data.row.SYdianliu + "mA",
        alarm: flag1 ? alarmType : "无",
        time: flag1 ? time : "无",
        value: flag1 ? value : "无",
        images:
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAjCAYAAAAe2bNZAAAEeklEQVRYR8WYWazdYxTFf8tY1BxDalaUBGlrSKOtoE1VWySIeBKUB/rmiqGNWQmqD5LqAxqeKO2Dob1aSlQNMVWCUDHPgpqHmJas+s7N6b1n+P9x2U8nOXt/3/rvce1P1BDbGwHjgQnAYcBwYFtgM+BX4HPgbeB5YAXwpKSfq16hKoq2dwDOBc4GdqtiU3S+AO4C5kp6t5tdRzC2NwQuAGYBW5bDfsgXA08ArxVvfA9sCgT0/sARwFHA1sXmF+Bm4CpJ37UD1RaM7T2Ae4DDi/HrwA3AYknfdvtK21sA04CLgZFF/42Et519SzC2Y7y8fOk3wKXAPEl/dAPR6n/bZwFzgM2BQyW90kpvABjbBwMri4tfBY6X9M7fAdFsY3tYEl3SW5XCVELzXPHIM8BkSfHMfyJ9nrGd3wGQHHkZGNsp2QYDXTOYC4HrgWT7SEnpF4MmtrcB7gaelnRlLloHxvZ2wIelec2QdEsdFLb3AT6W9GNVO9tHA48W/eH5+AaYy4ErgDWS0icqi+37k+RAmtq+kn6rYlzSIgVyQGmKPbK9AfA+sAswXdKCKocVjx4HLG3SP0fSbTXsTwfuBD7N/QGTOfMI8BOwU52ktf04cGTT5W8C+0lyFUC2h5YOPiTnBMxsYCbwsKRJVQ4pXhkLrCr6aYbxcORUSffWOOdBYCowO2CWAQExS9K1NQ5ZAkwp+uOagK2WNLrGOcnV5GxvwKQj7g2cImlxlUPKuFhddFdImmg7oU7II1MlNedS22Ntn5R5t654bH8JpLTHS2q4vSMm2wsTjqI0RVKv7eZkXiUpvKer2M50fwz4OmDSG0KODpH0Yjfr0lPWlBz5CDgDCNX4HbijVGWOqfRxthPSF1JAtT1j+9ZCsrrh7pXUyKlOYUq+hRutrZUztncuPWnj0uSSN40qyoWpqlHAnuX2UZJe6oTa9snAotDV5mqaKem6LobhJD1F5wRJD/TXt51unK4cWSjptC5nXgKkipcHzDWFVi6TNLmdYZlfHxSCFH6TeTKguZU2nwrdq3hqhKQ0w5Zi+yHg2EafOaYw+Y4d2HYm62XlxB5JcztccD5wU/l/gaTprXRth1d/VgpoQqXZVL42LSBrSQj5sE482PZWwCfFi6nWoW28GDp6O5Cq3L3y1LY9Hzgz3VJSeE9HsX1eIfA3NvhKi/wKyR8RxhCdWnzG9pA6S5ntTSRlTRkgBey8MqB3lbT2f2F6tjN+UvLJmYskZQX6i+lF+nHgrBLjBoOM285il7FzIPAsMKaRT+utKmU7SGvevpDzSXX4TYU8iieyj41JxwVGS3qvYddqb8p2EG6ajTBbwon/0t6UvnMfcBCQx4CJkrIm90m7jTLDqxfYEfhHG2WhtTOAq8timJeKaZISovVkMHft9JrMnaxADZIfAGGCfaHp6pmmpG73CvFUWYGbXyHCZ/MKEbYfXpyXiIQ6kl0s9HaOpFCNljLY7zOZZdkW5ktKeDpKJTBNnsrLVb4686z/y1Vm21dAhmT29RTByqp7VO74E1C88Y3Kjq/kAAAAAElFTkSuQmCC",
      },
      {
        A1: info.noVoltageAlarmAValue + "V",
        A2: res.data.row.ADianYa + "V",
        B1: info.noVoltageAlarmBValue + "V",
        B2: res.data.row.BDianYa + "V",
        C1: info.noVoltageAlarmCValue + "V",
        C2: res.data.row.CDianYa + "V",
        alarm: flag2 ? alarmType : "无",
        time: flag2 ? time : "无",
        value: flag2 ? value : "无",
        images:
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAlCAYAAAAqXEs9AAAErklEQVRYR8WY6c9dUxTGf48pEmIIiRiCttKoMUSCalGNoTULMcUHJKUEH5TEXyBCCTXUnEipICoNWqRqamruB5SIKWYRU8zjI8+bfV63p/fec27f94315eaes/c6z95r7Wc9a4sBzfZ4YBowHdgV2A7YBFgP+AX4FFgNPAcsl/TuIJ9Qm8G2M+4E4CLgkPLxNlMz5lXgNmCBpF+bJjUCsj0VuAnYs8PZZ8DzwCrgQ+B74B9gM2BHYF9gMrBLx5yPgcskPdAPVE9AtjcErgQuLQ7+AO4D7gRWSvq7abW29wPOBc4qYc2U+ZJm95rbFZDtLYAlwAFl4tKES9J7TSC6vbe9A3AdcDLwM7C1pN+6jV0LkO1sexJyb+D37JCkhGzEZvto4CNJb7XaIdvrFzCJ/4/AcZKeGTGSARyssUO2ryk5k3w5TNKKAXyNytBhQLanlJMTx7MlzR+VL/RxYntT4ArgCUlJEzoBJa67AUslzRhrMPFv+5xyar8LwSbRhwDZPhF4GPgLmCgp3DJstjfPrgEvSVo+CNiSyHsB90gKf3X6DWfl5IZiZkm6vQK0LDkD3C0pqNcw24uBY8vDGZJCA41m+6hCHxm7QlLSou77jsJV4bbJsj0OeL+Eb6qkF7pMuhG4sDx/G9hDUpi5p9lObXsTmFQGzZN0cRff4bqVhel3CqDzgVuAL0sc3WVSiDJhzG8sJBmQ/QBlAdWYlJZxkvJb36FE6RNge+C8AFoInAYslHRGry/YzuquL++/BcZL+qHb+EKuHwBblfeXSLqhj+8Kw4IAeh3YpxS+8FBXK6SZEERyxK6VVNW5+qorPsvzd0qIe9Y+25cDVwGvBFBCtQ1wiqSHGsLQmaR/Bpyk7MSw2d4ZiAbKyYk1HgLbpwL3A18EUEpECOoISU/1A5R3tlN0Ayy2WNLxNUCLinbK41acZvvIjE3hXRdAOTUJXU5RbFpV72wfDDxbnucU5jTmVPY124cDTwI/DRSyyqvtJGjUY2yVpAiy7N5rRZzlb9dj3g2Z7ciSB4GvWid1LSxbFu7KbywCLHSxoPxPKZggKb+NZnsOcPXQ4mxHBZ4eNSjpzMbZZUCNBqpSE5KN9T3m9W/YvhcI5SwMoFnArcnwkJOktYixxzYnh5IfE2vvc8ImNTF5R/hDjKlx21bE2Fg6eu2a7aiCx2vvZ0rKSWxlHbInGzGhVXHt59l2AFVyZYmkma2Q/Bf6u4CzgaclTW8lPxoARYNHK2eFj0kKr7WyUtgT4g2AkyQt+r8FWkWyqyXtnlX0krAXSIoCGDOzHcF3c/nAsOzpJfJTp1JKxqTjsH1oYebUu7mSwkNDVgeUNiidxv6h8dSs0e48bB9U6lbq58tpuTu74G6NYjRMOoAI/nSXc0axUYxoizTZuCiCKZK+7syLXq10SsKj5cIg40faSufSYV6HSngROEbSN/UkHbPLhiLoDiwCPmVho/LxuenFJCVP17J1vY75vDSVUZvVdUycR3OH+VP9c42Ty6zK3kijICnXOD2tEVBmjuDCKpoo+ijheqRNnWwFqHM55Uov13m51uu80suwXLVk96Kj01Auq0vcJmIbGFCTw5G+/xdriP2wh+9VigAAAABJRU5ErkJggg==",
      },
      {
        A1: info.noAlarmATemperatureValue + "℃",
        A2: res.data.row.AWenDu + "℃",
        B1: info.noAlarmBTemperatureValue + "℃",
        B2: res.data.row.BWenDu + "℃",
        C1: info.noAlarmCTemperatureValue + "℃",
        C2: res.data.row.CWenDu + "℃",
        D1: info.noAlarmNTemperatureValue + "℃",
        D2: res.data.row.NWenDu + "℃",
        alarm: flag3 ? alarmType : "无",
        time: flag3 ? time : "无",
        value: flag3 ? value : "无",
        images:
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAABECAYAAADgHze4AAAFdUlEQVRoQ+2ae7CVYxTGfw/GvTHuNS4hxmVyCZPJJRJlVKMyTTWIqYgxSCa3kEQ0k1t/GEqaRNKkksgllxFFbmE0I8XIpRCFcpnwmLXtfebz9u2z9+mc+muvf86c711rvc+3vvd913qftUUDxPb5QC/gVGCXjOmfwFvA08A4SeurdatqFG13AO4HjqxC/xvgekmPVaFLRQC2ewNTq3GW6AyTNKqSXb0AbB8LvFfJST3jgySNq8++LADb2wLfArvnOIhvPRv4DNgLOAsYALkRbS3pk3Ig6gMwGrg2MVwH9JT0UurQ9uHAFOCYZGyhpBMbBMD2dsAaYIeM4T/hXNLH5ZwV7ZYB+yY6bSQtzrPLjYDtzsDziUFsr0GV1oPtPsATid5wSbc1BMDVwD2JwdGSPqoEIMZtfw3sk9GdJOmihgC4A7gxY/B7hFXST1UCeAWIs6MksyWd0xAA9wKDMwY/A60k/VglgFikZ2R050o6uyEAxgDXZAx+LQL4oUoALwOnZ3SfldS1BqAWgVoEahGoRaDJImA76oTrgMOAD4D7JEVlXBDbm+8otr0TsAg4IvNGS4B2kn7ZnAAOkrTa9gjglpxwDpYUpftmi8CBkY5tvwB0ygEwUVL/LQEgzfUlLBMkDdwSAOYWy/A0CHU14+ZahKVPUANQi0AtArUI1CKwRSIQN+O4IZck8vwBktbYrgZAejt+UlLwBhvJRgSF7a2B14CTM9p/AFEPrKwSwBvASRn7L4GOkpanCPIAvAnkcTotJa2oEsBTwSUlkwW3cLykL7LP/wfAdrlc/2KkYEm2PRPonhPNqAuDWYmKqFuRRUvVVkQpl2VS6wDYvgkYmeN4lqQeRcdbARHedjl60yQFqVkQ2ynHUBqaIenc0j8FALb3AwJdKg9LurioE3+HAofkLabis0+BEZIKJJXtfsCkHP3OkiKq/xGLticDQURnZbqkIKZj/Bkgl+EoA+ZBSZcVbaOAjUI2K8slHVwAYDuYzu8ShbXAbsVvXm7b1ROIwlB2TbwLHJcY9JI0PQDcAKSk8iWSxtu+ssiSV5qs3HiwqjNttwXeTpTmS2ofABYki2qtpF1tNwMKF41GSLBre0raYHt+crb8DTQPAMH/xm2nJJMl9bM9DLi9EZOXTPtLmmg7Svbxib+uhY2dPLxc0gO2XwdOaQIAUyX1tR1rINZCVobkAegi6TnbQdW3aAIABbbcdnPgK2CbjM/ReQBOkLTI9oZEeVOxLJbUxvb2wPdArK2S3J8HoFP0A2wHPxxGjZV3JLW1vT8QeSBO05KMzAMwUNIE29EXaN3Y2aOTJqm77ei0RZbNylUB4C8gUnBJpkg6z/bdwJAmADBK0jDbwT1HfshKxwDwIXBU5ul6STsXQxZ5vLFyqKSltuPtIwoliTNmjwBwV5FuyU40QNIjtucAXRqBYI6kbrYjgS1N/MyU1DMAtAKiz5OVdZKa2d4RqLoLmgO0haRVtl8FTkvGe0iaVcqGeW9a6HLYjuoojtHs6q0mKGdKmlcmn6wEosLaUAIQhFNeb2+MpKG2gw2LMitLTJUDEbunj6QltqNyigoqld6SpsXDbEV0Z/R8c5QflXRhPLd9KXBFGSDBlI2V9FBR91ZgeI6/BZLqCta0JoyUGakzlc9jS0qKjmkAiRoizoi9gdgpyyTFKRdj0bgcWyaP/FZs/awqTZACiGMyQtiyTHzjM8WniPBFay62UmTSaO9GuKPWK5fAgsjsIGlh1ndeWR5vN6tM4VnN4svTiTeOJPd+Olhf7zha9nVV7qbODMwAoou+Os9HpfZ9X+BmIBrTDZVYlHEMP16fYTU/YAidC4C4G7SPYrUeh/Gd5wHToxyPorYS6n8BoimDdp+ip78AAAAASUVORK5CYII=",
      },
    ];

    console.log(infoData.value, 33333);
  });
};

const echartsFun = (devId: any) => {
  const time = new Date();
  const year = time.getFullYear();
  const month = time.getMonth() + 1;
  const day = time.getDate();
  const now = year + "-" + month + "-" + day;

  ElectricDeviceDate(devId, now).then((res) => {
    let result = res.data.DevData || res.data.Data;

    if (result.length == 0) {
      return;
    }
    type EChartsOption = echarts.EChartsOption;
    var chartDom = document.getElementById("echarts_wapper_one_search")!;
    var chartDom2 = document.getElementById("echarts_wapper_two_search")!;
    var chartDom3 = document.getElementById("echarts_wapper_three_search")!;
    var myChart = echarts.init(chartDom);
    var myChart2 = echarts.init(chartDom2);
    var myChart3 = echarts.init(chartDom3);
    var option: EChartsOption;
    var option2: EChartsOption;
    var option3: EChartsOption;
    let dianLiuUa = [];
    let dianLiuUb = [];
    let dianLiuUc = [];
    let dianLiuUd = [];
    let dianYaA = [];
    let dianYaB = [];
    let dianYaC = [];
    let wenduA = [];
    let wenduB = [];
    let wenduC = [];
    let wenduN = [];
    let name = [];

    //图标数据赋值
    res.data.Data.forEach((element: any) => {
      dianLiuUa.push(element.ia);
      dianLiuUb.push(element.ib);
      dianLiuUc.push(element.ic);
      dianLiuUd.push(element.ld);
      wenduA.push(element.ta);
      wenduB.push(element.tb);
      wenduC.push(element.tc);
      wenduN.push(element.tn);
      dianYaA.push(element.ua);
      dianYaB.push(element.ub);
      dianYaC.push(element.uc);
      name.push(element.happenedTime);
    });
    option = {
      tooltip: {
        trigger: "axis",
      },
      legend: {
        data: ["A电流(A)", "B电流(A)", "C电流(A)", "剩余电流(mA)"],
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      toolbox: {
        feature: {
          saveAsImage: {},
        },
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: name.reverse(),
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          name: "A电流(A)",
          type: "line",

          data: dianLiuUa.reverse(),
        },
        {
          name: "B电流(A)",
          type: "line",

          data: dianLiuUb.reverse(),
        },
        {
          name: "C电流(A)",
          type: "line",

          data: dianLiuUc.reverse(),
        },
        {
          name: "剩余电流(mA)",
          type: "line",

          data: dianLiuUd.reverse(),
        },
      ],
    };
    option2 = {
      tooltip: {
        trigger: "axis",
      },
      legend: {
        data: ["A温度(℃)", "B温度(℃)", "C温度(℃)", "N温度(℃)"],
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      toolbox: {
        feature: {
          saveAsImage: {},
        },
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: name,
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          name: "A温度(℃)",
          type: "line",

          data: wenduA,
        },
        {
          name: "B温度(℃)",
          type: "line",

          data: wenduB,
        },
        {
          name: "C温度(℃)",
          type: "line",

          data: wenduC,
        },
        {
          name: "N温度(℃)",
          type: "line",

          data: wenduN,
        },
      ],
    };
    option3 = {
      tooltip: {
        trigger: "axis",
      },
      legend: {
        data: ["A电压(V)", "B电压(V)", "C电压(V)"],
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      toolbox: {
        feature: {
          saveAsImage: {},
        },
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: name.reverse(),
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          name: "A电压(V)",
          type: "line",
          // stack: "总量",
          data: dianYaA.reverse(),
        },
        {
          name: "B电压(V)",
          type: "line",
          // stack: "总量",
          data: dianYaB.reverse(),
        },
        {
          name: "C电压(V)",
          type: "line",
          // stack: "总量",
          data: dianYaC.reverse(),
        },
      ],
    };
    myChart.setOption(option);
    myChart2.setOption(option2);
    myChart3.setOption(option3);
  });
};

const show = (devId: any, type: number) => {
  dialogVisible.value = true;
  loading.value = true;
  ElecData_typeFun(devId, type);
  getDeviceByDevIdFun(devId);
  echartsFun(devId);
};
defineExpose({
  show,
});
</script>
<style scoped lang="less">
.dialog-footer button:first-child {
  margin-right: 10px;
}
#dianli {
  /deep/.el-dialog {
    .el-dialog__header {
      margin-right: 0;
      background: #1071e2;
      .el-dialog__title {
        color: #fff;
      }
    }

    .el-dialog__headerbtn .el-dialog__close {
      color: #fff;
    }
    .shebeiInfo {
      .one {
        // width: 300px;
        color: #4b6082;
        padding-bottom: 10px;
        box-shadow: 0px 0px 10px 0px rgba(3, 27, 29, 0.11);
        span {
          color: #000;
        }
        .titleP {
          margin-left: 20px;
          line-height: 40px;
          font-weight: bold;
          // text-align: center;
        }
        ul {
          border-top: 1px solid #f3f6fa;
          padding-left: 20px;
          li {
            margin-top: 8px;
          }
        }
      }
      .two {
        margin-top: 20px;
        width: 300px;
        height: 250px;
        box-shadow: 0px 0px 10px 0px rgba(3, 27, 29, 0.11);
        // background: #bfa;
        .titleP {
          padding-left: 20px;
          line-height: 40px;
          // text-align: center;
          border-bottom: 1px solid #f3f6fa;
        }
        /deep/.el-button--mini {
          margin: 10px 0 0 15px;
        }
      }
      .ulInfo {
        width: 150px;
        height: 150px;
        border-radius: 50%;
        text-align: center;
        margin: 0 auto;
        // line-height: 150px;
        padding: 1px;
        color: #fff;
        font-size: 20px;
      }
    }

    .boxWapper {
      box-shadow: 0px 0px 10px 0px rgba(3, 27, 29, 0.11);
      .infoBox {
        background: #1071e2;
        height: 100px;
        color: #fff;

        // padding: 5px;
        .el-col-6 {
          text-align: center;
          margin-top: 10px;
          img {
            width: 35px;
            height: 35px;
          }
        }
        .el-col-8 {
          text-align: center;
          margin-top: 10px;
          img {
            width: 35px;
            height: 35px;
          }
        }
        .textLong {
          overflow: hidden; /* 超出一行文字自动隐藏 */
          text-overflow: ellipsis; /*文字隐藏后添加省略号*/
          white-space: nowrap; /*强制不换行*/
        }
      }
      ul {
        padding: 0 10px 10px 10px;
        // padding-top: none;
        li {
          margin-top: 10px;
        }
      }
      .status {
        color: red;
      }
    }
    .one_echarts {
      box-shadow: 0px 0px 10px 0px rgba(3, 27, 29, 0.11);
      height: 340px;
      margin-top: 10px;
      .titleP {
        padding-left: 20px;
        line-height: 40px;
        // text-align: center;
        font-weight: bold;
        border-bottom: 1px solid #f3f6fa;
      }
      #echarts_wapper_one_search {
        height: 300px;
        // background: #4b6082;
      }
      #echarts_wapper_two_search {
        height: 300px;
        // background: #4b6082;
      }
      #echarts_wapper_three_search {
        height: 300px;
        // background: #4b6082;
      }
    }
    .four_echarts {
      height: 200px;
      // background: #bfa;
      margin-top: 20px;
      box-shadow: 0px 0px 29px 0px rgba(0, 0, 0, 0.1);
      .titleP {
        padding-left: 20px;
        line-height: 40px;
        border-bottom: 1px solid #f3f6fa;
        // text-align: center;
      }
      .echarts_wapper_four_search {
        width: 100%;
        height: 160px;
      }
    }
    .shezhi_left {
      // background: #bfa;

      box-shadow: 0px 0px 10px 0px rgba(3, 27, 29, 0.11);
      .titleP {
        margin-left: 20px;
        line-height: 40px;
        // text-align: center;
      }
      ul {
        border-top: 1px solid #f3f6fa;
        // padding-left: 20px;
        padding: 10px;
        li {
          margin-top: 8px;
        }
      }
    }
    .stateDate {
      background: #1071e2;
      color: #fff;
      padding: 10px;
      margin-bottom: 10px;
    }
    .shizhi_right {
      .row-bg {
        padding: 10px;
      }
      .right_one {
        margin-left: 20px;
        height: 265px;
        box-shadow: 0px 0px 10px 0px rgba(3, 27, 29, 0.11);

        .titleP {
          padding-left: 20px;
          line-height: 40px;
          border-bottom: 1px solid #f3f6fa;
          // text-align: center;
        }
        .el-button {
          width: 100%;
          // margin-bottom: 20px;
        }
      }
      .right_two {
        margin-top: 20px;
        margin-left: 20px;

        box-shadow: 0px 0px 10px 0px rgba(3, 27, 29, 0.11);
        .titleP {
          padding-left: 20px;
          line-height: 40px;
          border-bottom: 1px solid #f3f6fa;
          // text-align: center;
        }
        .tabs {
          padding: 10px 30px;
          p {
            margin-bottom: 5px;
            // margin-top: 20px;
          }
          .tabs_one {
            .el-input__inner {
              margin-bottom: 20px;
            }
          }

          .el-button {
            width: 100%;
          }
        }
      }
    }
  }
}
</style>
