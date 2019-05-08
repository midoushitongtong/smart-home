import React from 'react';
import { compose } from 'redux';
import { Table, Modal, Spin, Button, Col, Form, Row, Input } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import api from '../../../../../../../api';
import stringUtil from '../../../../../../../util/string';
import './index.less';

// 当前组件的类型声明
interface Props extends FormComponentProps {
}

interface State {
  // 表格的适配信息
  columns: any;
  // 表格的数据
  dataSource: any;
  // 表格的分页
  pagination: any;
  // 获取表格数据的条件
  searchCondition: any;
  // 表格加载状态
  loading: boolean;

  // 图标
  icon: any;

  // 用户房间与设备信息
  personUserRoomDevice: any;
  // 用户房间与设备信息模态框显示/隐藏
  personUserRoomDeviceModalVisible: boolean;
  // 用户房间与设备信息模态框数据加载状态
  personUserRoomDeviceModalLoading: boolean
}

// 当前组件类
export default compose<React.ComponentClass>(
  Form.create()
)(
  class LayoutMasterSystemUserPersonList extends React.Component<Props, State> {
    public constructor(props: Props) {
      super(props);
      this.state = {
        columns: [
          {
            title: 'openid', dataIndex: 'openid'
          },
          {
            title: '昵称', dataIndex: 'nickName', render: (text: any, record: any) => (
              <span>{stringUtil.unicodeToChinese(text)}</span>
            )
          },
          {
            title: '头像', dataIndex: 'avatarUrl', render: (text: any, record: any) => (
              <img src={text} alt={record.nickName}/>
            )
          },
          { title: '注册日期', dataIndex: 'created_at' },
          { title: '最后修改日期', dataIndex: 'updated_at' },
          {
            title: '操作', dataIndex: 'action', render: (text: any, record: any) => (
              <div className="table-data-action-container">
                <span onClick={() => this.showUserRoomAndDeviceInfo(record)}>查看已绑定的房间与设备</span>
              </div>
            )
          }
        ],
        dataSource: [],
        pagination: {
          total: 0,
          current: 1,
          pageSize: 10,
          showSizeChanger: true,
          pageSizeOptions: ['10', '20', '100']
        },
        searchCondition: {},
        loading: false,
        icon: {
          '/assets/images/balcony.png': require('../../../../../../../assets/images/balcony.png'),
          '/assets/images/bathroom.png': require('../../../../../../../assets/images/bathroom.png'),
          '/assets/images/cur.png': require('../../../../../../../assets/images/cur.png'),
          '/assets/images/door.png': require('../../../../../../../assets/images/door.png'),
          '/assets/images/fan.png': require('../../../../../../../assets/images/fan.png'),
          '/assets/images/home.png': require('../../../../../../../assets/images/home.png'),
          '/assets/images/hood.png': require('../../../../../../../assets/images/hood.png'),
          '/assets/images/kitchen.png': require('../../../../../../../assets/images/kitchen.png'),
          '/assets/images/LED.png': require('../../../../../../../assets/images/LED.png'),
          '/assets/images/living.png': require('../../../../../../../assets/images/living.png'),
          '/assets/images/master-bedroom.png': require('../../../../../../../assets/images/master-bedroom.png'),
          '/assets/images/restaurant.png': require('../../../../../../../assets/images/restaurant.png'),
          '/assets/images/second-bedroom.png': require('../../../../../../../assets/images/second-bedroom.png'),
          '/assets/images/tem.png': require('../../../../../../../assets/images/tem.png')
        },
        personUserRoomDevice: {},
        personUserRoomDeviceModalVisible: false,
        personUserRoomDeviceModalLoading: false
      };
    }

    public componentDidMount = (): void => {
      const { state } = this;
      this.refreshData({
        page: state.pagination.current,
        pageSize: state.pagination.pageSize,
        ...state.searchCondition
      });
    };

    /**
     * 刷新表格数据
     *
     */
    public refreshData = async (searchCondition: any) => {
      const { state } = this;
      this.setState({
        loading: true
      });

      // 获取表格数据
      const result: any = await api.personUser.selectPersonUserList(searchCondition);

      // 获取成功, 刷新数据
      const pagination = {
        ...state.pagination,
        total: result.data.count,
        current: result.data.page,
        pageSize: result.data.pageSize
      };

      this.setState({
        loading: false,
        pagination,
        dataSource: result.data.rows
      });
    };

    /**
     * 搜索表格数据
     *
     */
    public handleSearch = (e: React.FormEvent): void => {
      e.preventDefault();
      const { state, props } = this;
      props.form.validateFields(async (error, valueList) => {
        if (!error) {
          // 保存搜索条件
          this.setState({
            searchCondition: valueList
          });
          // 刷新表格数据
          this.refreshData({
            page: 1,
            pageSize: state.pagination.pageSize,
            ...valueList
          });
        }
      });
    };

    /**
     * 重置搜索参数
     *
     */
    public handleReset = (): void => {
      const { state, props } = this;
      // 清空搜索条件
      this.setState({
        searchCondition: {}
      });
      props.form.resetFields();
      // 刷新表格数据
      this.refreshData({
        page: 1,
        pageSize: state.pagination.pageSize
      });
    };

    /**
     * 表格的数据搜索条件发送变化
     *
     */
    public handleTableChange = (currentPagination: any): void => {
      const { state } = this;
      // 获取表格数据
      this.refreshData({
        page: currentPagination.current,
        pageSize: currentPagination.pageSize,
        searchCondition: {
          ...state.searchCondition
        }
      });
    };

    /**
     * 查看用户房间与设备信息
     *
     */
    public showUserRoomAndDeviceInfo = async (record: any) => {
      this.setState({
        personUserRoomDeviceModalLoading: true,
        personUserRoomDeviceModalVisible: true,
        personUserRoomDevice: {
          avatarUrl: record.avatarUrl,
          nickName: stringUtil.unicodeToChinese(record.nickName)
        }
      });
      // 获取用户房间与设备信息
      const result: any = await api.personUser.selectPersonUserRoomDeviceList({
        openid: record.openid
      });
      this.setState((state) => ({
        personUserRoomDeviceModalLoading: false,
        personUserRoomDevice: {
          ...state.personUserRoomDevice,
          roomDeviceList: result.data
        }
      }));
    };

    /**
     * 顶部操作容器
     *
     */
    public getOperationContainer = (): JSX.Element => {
      const { props } = this;
      return (
        <section className="data-operation-container">
          <section className="search-container">
            <Form onSubmit={this.handleSearch}>
              <Row className="search-field-container">
                <Col md={8}>
                  <Form.Item label="昵称">
                    {props.form.getFieldDecorator('nickName', {
                      rules: []
                    })(
                      <Input/>
                    )}
                  </Form.Item>
                </Col>
                <Col md={8} className="search-action-container">
                  <Button type="primary" htmlType="submit">搜索</Button>
                  <Button onClick={this.handleReset}>重置</Button>
                </Col>
              </Row>
            </Form>
          </section>
        </section>
      );
    };

    public render = (): JSX.Element => {
      const { state } = this;
      return (
        <section className="person-list-container">
          {this.getOperationContainer()}
          <section className="data-container">
            <Table
              columns={state.columns}
              rowKey={(record: any) => record.id}
              dataSource={state.dataSource}
              pagination={state.pagination}
              loading={state.loading}
              onChange={this.handleTableChange}
            />
          </section>
          {/* 用户设备信息 */}
          <Modal
            className="person-user-room-device-modal"
            title={(
              <section className="user-base-info">
                <img src={state.personUserRoomDevice.avatarUrl} alt={state.personUserRoomDevice.nickName}/>
                <span>{state.personUserRoomDevice.nickName}</span>
              </section>
            )}
            visible={state.personUserRoomDeviceModalVisible}
            footer={null}
            onCancel={() => this.setState({
              personUserRoomDeviceModalVisible: false
            })}
          >
            {!state.personUserRoomDeviceModalLoading
              ? state.personUserRoomDevice.roomDeviceList && state.personUserRoomDevice.roomDeviceList.length > 0
                ? (
                  <section className="room-list-container">
                    {state.personUserRoomDevice.roomDeviceList.map((roomDeviceItem: any) => {
                      return (
                        <div className="room-list-item" key={roomDeviceItem.id}>
                          <div className="room-base-info">
                            <img src={state.icon[roomDeviceItem.icon]} alt={roomDeviceItem.name}/>
                            <span>{roomDeviceItem.name}</span>
                          </div>
                          {roomDeviceItem.deviceList && roomDeviceItem.deviceList.length > 0
                            ? (
                              <div className="device-list-container">
                                {roomDeviceItem.deviceList.map((deviceItem: any) => (
                                  <div className="device-item" key={deviceItem.id}>
                                    <div className="device-base-info">
                                      <img src={state.icon[deviceItem.icon]} alt={roomDeviceItem.name}/>
                                      <span>{deviceItem.name}</span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )
                            : (
                              <div className="device-list-container">
                                <div className="device-item">
                                  <div className="device-base-info">
                                    <span>此房间暂无设备！</span>
                                  </div>
                                </div>
                              </div>
                            )}
                        </div>
                      );
                    })}
                  </section>
                )
                : (
                  <section>此用户暂无房间与设备信息！</section>
                )
              : (
                <section className="modal-loading-container">
                  <Spin size="default"/>
                </section>
              )}
          </Modal>
        </section>
      );
    };
  }
);
