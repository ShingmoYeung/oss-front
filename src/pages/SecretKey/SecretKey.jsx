import React, { Component } from 'react';
import './index.scss';
import { Alert, Button, Collapse, Divider, Form, Icon, Input, Modal, Table } from 'antd';

const data = [
  {
    AccessKeyId: 'LTAI6Mf6vkhsILcs',
    AccessKeySecret: 'Lmi3Uz2sdqq6NRwR71FynQqB1wDI6b',
    createTime: '2019-06-25 22:07:04',
    state: '启用',
  }, {
    AccessKeyId: 'LTAI6Mf6vkhsILc2',
    AccessKeySecret: 'Lmi3Uz2sdqq6NRwR71FynQqB1wDI6c',
    createTime: '2019-06-25 22:07:04',
    state: '禁用',
  },
];

const confirm = Modal.confirm;
const { Panel } = Collapse;
class SecretKey extends Component {
  static displayName = 'SecretKey';

  constructor(props) {
    super(props);
    this.state = {
      modelLoading: false,
      tableLoading: false,
      showCreateModel: false,
      generateSuccess: false,
      genLoading: false,
      showKeySecret: [],
    };
  }

  showDisableKeyWarning = (record, e) => {
    e.preventDefault();
    const thisAlias = this;
    confirm({
      title: (
        <div>
          你确定要
          <span style={{ color: 'red', fontWeight: 'bold', margin: '0 5px' }}>禁用</span>
          AccessKey:
          <span style={{
            color: 'green',
            margin: '0 5px',
            fontWeight: 'bold',
          }}
          >
            {record.AccessKeyId}
          </span>
          吗?
        </div>
      ),
      centered: true,
      okText: '确定',
      cancelText: '取消',
      onOk() {
        thisAlias.disableKey(record);
      },
    });
  };

  disableKey =(record) => {
    console.log(record);
  };

  showEnableKeyWarning = (record, e) => {
    e.preventDefault();
    const thisAlias = this;
    confirm({
      title: (
        <div>
          你确定要
          <span style={{ color: 'green', fontWeight: 'bold', margin: '0 5px' }}>启用</span>
          AccessKey:
          <span style={{
            color: '#607D8B',
            margin: '0 5px',
            fontWeight: 'bold',
          }}
          >
            {record.AccessKeyId}
          </span>
          吗?
        </div>
      ),
      centered: true,
      okText: '确定',
      cancelText: '取消',
      onOk() {
        thisAlias.enableKey(record);
      },
    });
  };

  enableKey =(record) => {
    console.log(record);
  };

  showDeleteKeyWarning = (record, e) => {
    e.preventDefault();
    const thisAlias = this;
    confirm({
      title: (
        <div>
          你确定要
          <span style={{ color: 'red', fontWeight: 'bold', margin: '0 5px' }}>删除</span>
          AccessKey:
          <span style={{
            color: 'green',
            margin: '0 5px',
            fontWeight: 'bold',
          }}
          >
            {record.AccessKeyId}
          </span>
          吗?
        </div>
      ),
      centered: true,
      okText: '确定',
      cancelText: '取消',
      onOk() {
        thisAlias.deleteKey(record);
      },
    });
  };

  deleteKey =(record) => {
    console.log(record);
  };

  renderOp = (text, record) => {
    return (
      <div>
        {
          record.state === '禁用' ? (
            <Button type="link" size="small" onClick={e => this.showEnableKeyWarning(record, e)}>启用</Button>
          ) : (
            <Button type="link" size="small" onClick={e => this.showDisableKeyWarning(record, e)}>禁用</Button>
          )
        }
        <Divider type="vertical" />
        <Button type="link" size="small" onClick={e => this.showDeleteKeyWarning(record, e)}>删除</Button>
      </div>
    );
  };

  renderState = (text) => {
    if (text === '启用') {
      return (
        <span style={{ color: '#009900' }}>{text}</span>
      );
    }
    if (text === '禁用') {
      return (
        <span style={{ color: 'red' }}>{text}</span>
      );
    }
  };

  renderAccessKeySecret = (text, record) => {
    const { showKeySecret } = this.state;
    const find = showKeySecret.find(i => i === record.AccessKeyId);
    if (find) {
      return (
        <div>
          <span className="access-key-secret-text">{text}</span>
          <Button type="link" size="small" onClick={e => this.showKeySecret(record, e)}>隐藏</Button>
        </div>
      );
    }
    return (
      <Button type="link" size="small" onClick={e => this.showKeySecret(record, e)}>显示</Button>
    );
  };

  showKeySecret = (record, e) => {
    e.preventDefault();
    const { showKeySecret } = this.state;
    const filter = showKeySecret.filter(i => i !== record.AccessKeyId);
    if (filter.length === showKeySecret.length) {
      filter.push(record.AccessKeyId);
    }
    this.setState({
      showKeySecret: filter,
    });
  };

  saveAKInfo = () => {
    console.log('save AK info');
  };

  showModel = () => {
    this.setState({
      showCreateModel: true,
    });
  };

  closeModel = () => {
    this.setState({
      showCreateModel: false,
    });
  };

  callback = (key) => {
    console.log(key);
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({
      genLoading: true,
    });
    await this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        console.log('generate success');
        setTimeout(() => {
          this.setState({
            generateSuccess: true,
          });
        }, 500);
      }
    });
    this.setState({
      genLoading: false,
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { tableLoading, generateSuccess, showCreateModel, modelLoading, genLoading } = this.state;
    return (
      <div className="secret-key">
        <div className="bread">
          密钥管理
        </div>
        <Divider type="horizontal" />
        <div className="help-info">
          注意：每个账户最多能创建 3个 密钥对
        </div>
        <Alert
          style={{ margin: '10px 0', fontSize: '12px' }}
          message="AccessKey ID和AccessKey Secret是您访问 OSS API的密钥，具有该账户完全的权限，请您妥善保管。"
          type="warning"
          showIcon
        />
        <div className="table-viewer-header">
          <span className="table-viewer-topbar-title">
            用户AccessKey
          </span>
          {
            data.length < 3 ? (
              <div className="pull-right">
                <Button type="default" size="small" onClick={this.showModel}>
                  创建AccessKey
                </Button>
              </div>
            ) : null
          }
        </div>
        <Table
          className="secret-table"
          rowKey="AccessKeyId"
          dataSource={data}
          pagination={false}
          loading={tableLoading}
        >
          <Table.Column title="AccessKey ID" dataIndex="AccessKeyId" />
          <Table.Column width={380} title="Access Key Secret" dataIndex="AccessKeySecret" render={this.renderAccessKeySecret} />
          <Table.Column title="状态" dataIndex="state" render={this.renderState} />
          <Table.Column title="创建时间" dataIndex="createTime" />
          <Table.Column title="操作"
            render={this.renderOp}
          />
        </Table>
        {
          showCreateModel ? (
            <Modal
              visible={showCreateModel}
              title="新建用户 AccessKey"
              onCancel={this.closeModel}
              width={650}
              footer={
                generateSuccess ? (
                  [
                    <Button key="submit" type="primary" loading={modelLoading} onClick={this.saveAKInfo}>
                      保存AK信息
                    </Button>,
                  ]
                ) : (
                  [
                    <Button key="submit" type="default" onClick={this.closeModel}>
                      取消
                    </Button>,
                  ]
                )
              }
            >
              {
                generateSuccess ? (
                  <div>
                    <Alert style={{ fontSize: '12px' }} message="这是用户 AccessKey 可供下载的唯一机会，请及时保存！" type="success" />
                    <div style={{ textAlign: 'center', lineHeight: '100px' }}>
                      <h1>
                        <Icon type="check-circle" style={{ color: 'green', marginRight: '10px' }} />
                        新建AccessKey成功！
                      </h1>
                    </div>
                    <Collapse defaultActiveKey={['1']} onChange={this.callback}>
                      <Panel header="AccessKey 详情" key="1">
                        <div style={styles.newAccessKeyDetail}>
                          <div style={{ ...styles.item, ...styles.br }}>
                            <p style={styles.label}>AccessKeyID:</p>
                            <p style={styles.value}>LTAI6Mf6vkhsILc3</p>
                          </div>
                          <div style={styles.item}>
                            <p style={styles.label}>AccessKeySecret:</p>
                            <p style={styles.value}>Lmi3Uz2sdqq6NRwR71FynQqB1wDI6d</p>
                          </div>
                        </div>
                      </Panel>
                    </Collapse>
                  </div>
                ) : (
                  <div className="check-auth">
                    <Form labelCol={{ span: 8 }} wrapperCol={{ span: 12 }} onSubmit={this.handleSubmit}>
                      <Form.Item label="校验当前用户密码">
                        {getFieldDecorator('password', {
                          rules: [{ required: true, message: '请输入当前用户密码!' }],
                        })(
                          <Input placeholder="请输入密码" />
                        )}
                      </Form.Item>
                      <Form.Item wrapperCol={{ span: 12, offset: 8 }}>
                        <Button type="primary" htmlType="submit" loading={genLoading}>
                          生成 AccessKey
                        </Button>
                      </Form.Item>
                    </Form>
                  </div>
                )
              }
            </Modal>
          ) : null
        }
      </div>
    );
  }
}
const styles = {
  newAccessKeyDetail: {
    display: 'flex',
  },
  item: {
    flex: '1 1 50%',
    padding: '0 10px',
  },
  br: {
    borderRight: '1px solid #d9d9d9',
  },
  label: {
    fontSize: '12px',
  },
  value: {
    fontSize: '12px',
    color: '#7d6767',
    fontWeight: 'bold',
  },
};

const WrappedSecretKey = Form.create({ name: 'coordinated' })(SecretKey);
export default WrappedSecretKey;
