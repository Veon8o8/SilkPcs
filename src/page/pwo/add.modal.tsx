// src/page/pwo/add.modal.tsx

import React from 'react';
import { Modal, Button, Form, Input, Select, DatePicker, Table, Space, Card, Row, Col, Tag, InputNumber, Tabs } from 'antd';
import { ThunderboltOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { withTranslation, WithTranslation } from 'react-i18next';
import dayjs from 'dayjs';

const { Option } = Select;

interface AddWorkOrderModalProps extends WithTranslation {
    visible: boolean;
    loading?: boolean;
    onOk?: (values: any) => void;
    onCancel?: () => void;
    formRef: React.RefObject<any>;
}

interface AddWorkOrderModalState {
    productList: any[];
    reportList: any[];
}

class _AddWorkOrderModal extends React.Component<AddWorkOrderModalProps, AddWorkOrderModalState> {
    formRef = React.createRef<any>();

    constructor(props: AddWorkOrderModalProps) {
        super(props);
        this.state = {
            productList: [
                { key: '1', selectData: '', productName: '', planWeight: 0, productCode: '', productionUnit: '', producedWeight: 0, pendingWeight: 0 }
            ],
            reportList: [
                { key: '1', projectName: '选件数据', specModel: '暂无内容', unit: '', quantity: 0 }
            ]
        };
    }

    // 处理提交
    handleSubmit = () => {
        this.formRef.current?.validateFields().then((values: any) => {
            const formData = {
                ...values,
                workOrderNo: values.workOrderNo || '自动生成',
                productList: this.state.productList,
                reportList: this.state.reportList,
                totalBox70: values.totalBox70 || '暂无内容',
                totalBox80: values.totalBox80 || '暂无内容',
                totalOutput: values.totalOutput || '暂无内容',
                totalInterval: values.totalInterval || '暂无内容',
                netOutput: values.netOutput || '暂无内容',
                totalWaste: values.totalWaste || '暂无内容',
                totalExcess: values.totalExcess || '暂无内容',
                totalExcessWeight: values.totalExcessWeight || '暂无内容',
            };
            this.props.onOk?.(formData);
        });
    };

    // 取消
    handleCancel = () => {
        this.props.onCancel?.();
        this.formRef.current?.resetFields();
        this.setState({
            productList: [{ key: '1', selectData: '', productName: '', planWeight: 0, productCode: '', productionUnit: '', producedWeight: 0, pendingWeight: 0 }],
            reportList: [{ key: '1', projectName: '选件数据', specModel: '暂无内容', unit: '', quantity: 0 }]
        });
    };

    // 随机填充
    randomFill = () => {
        const randomDate = dayjs().add(Math.floor(Math.random() * 30), 'day');
        this.formRef.current?.setFieldsValue({
            workOrderName: `${dayjs().format('YYYY年MM月')}生产工单-随机${Math.floor(Math.random() * 100)}`,
            orderStatus: '待派工',
            startDate: dayjs(),
            endDate: randomDate,
            batchNo: `SC-${dayjs().format('YYYYMMDDHHmmss')}${Math.floor(Math.random() * 1000)}`,
            responsiblePerson: '易光莉',
        });
        this.setState({
            productList: [
                { key: Date.now(), selectData: '产品A', productName: '随机产品A/2026001', planWeight: 50.5, productCode: 'PC001', productionUnit: '吨', producedWeight: 20.3, pendingWeight: 30.2 },
                { key: Date.now() + 1, selectData: '产品B', productName: '随机产品B/2026002', planWeight: 30.0, productCode: 'PC002', productionUnit: '吨', producedWeight: 10.0, pendingWeight: 20.0 }
            ],
            reportList: [
                { key: Date.now() + 2, projectName: '报工A', specModel: '规格1', unit: '个', quantity: 80 },
                { key: Date.now() + 3, projectName: '报工B', specModel: '规格2', unit: '米', quantity: 200 }
            ]
        });
    };

    // 渲染底部按钮
    renderFooter = () => {
        const { loading } = this.props;

        return [
            <Button key="submit" type="primary" loading={loading} onClick={this.handleSubmit}>
                提交
            </Button>,
            <Button key="saveDraft" onClick={() => console.log('保存草稿')}>
                保存草稿
            </Button>,
            <Button key="cancel" onClick={this.handleCancel}>
                取消
            </Button>
        ];
    };

    // 生产产品明细表格列
    productColumns = [
        {
            title: '序号',
            dataIndex: 'key',
            render: (_: any, __: any, index: number) => index + 1,
            width: 60,
            fixed: 'left' as const,
        },
        {
            title: '选择数据',
            dataIndex: 'selectData',
            render: (text: string) => <Input defaultValue={text} placeholder="请选择" bordered={false} />,
            width: 120,
            fixed: 'left' as const,
        },
        {
            title: '产品名称(批号)',
            dataIndex: 'productName',
            render: (text: string) => <Input defaultValue={text} placeholder="请输入产品名称/批号" bordered={false} />,
            width: 160,
            fixed: 'left' as const,
        },
        {
            title: '计划生产重量(吨)',
            dataIndex: 'planWeight',
            render: (value: number) => <InputNumber defaultValue={value} min={0} step={0.1} style={{ width: '100%' }} bordered={false} placeholder="0" />,
            width: 150,
        },
        {
            title: '产品编码',
            dataIndex: 'productCode',
            render: (text: string) => <Input defaultValue={text} placeholder="请输入产品编码" bordered={false} />,
            width: 130,
        },
        {
            title: '生产单位',
            dataIndex: 'productionUnit',
            render: (text: string) => <Input defaultValue={text} placeholder="请输入生产单位" bordered={false} />,
            width: 120,
        },
        {
            title: '已生产数量(吨)',
            dataIndex: 'producedWeight',
            render: (value: number) => <InputNumber defaultValue={value} min={0} step={0.1} style={{ width: '100%' }} bordered={false} placeholder="0" />,
            width: 150,
        },
        {
            title: '待生产数量(吨)',
            dataIndex: 'pendingWeight',
            render: (value: number) => <InputNumber defaultValue={value} min={0} step={0.1} style={{ width: '100%' }} bordered={false} placeholder="0" />,
            width: 150,
        },
        {
            title: '操作',
            width: 80,
            fixed: 'right' as const,
            render: (_: any, record: any) => (
                <Button type="link" size="small" danger icon={<DeleteOutlined />} onClick={() => {
                    this.setState({ productList: this.state.productList.filter(item => item.key !== record.key) });
                }} />
            )
        }
    ];

    // 生产订单报工表格列
    reportColumns = [
        { title: '序号', dataIndex: 'key', render: (_: any, __: any, index: number) => index + 1, width: 60 },
        { title: '项目名称', dataIndex: 'projectName', render: (text: string) => <Input defaultValue={text} bordered={false} /> },
        { title: '规格型号', dataIndex: 'specModel', render: (text: string) => <Input defaultValue={text} bordered={false} /> },
        { title: '单位', dataIndex: 'unit', render: (text: string) => <Input defaultValue={text} placeholder="请输入单位" bordered={false} /> },
        { title: '数量', dataIndex: 'quantity', render: (value: number) => <InputNumber defaultValue={value} min={0} style={{ width: '100%' }} bordered={false} /> },
        {
            title: '操作', width: 80,
            render: (_: any, record: any) => (
                <Button type="link" size="small" danger icon={<DeleteOutlined />} onClick={() => {
                    this.setState({ reportList: this.state.reportList.filter(item => item.key !== record.key) });
                }} />
            )
        }
    ];

    // 添加生产产品明细行
    addProductRow = () => {
        const newKey = Date.now();
        this.setState({
            productList: [...this.state.productList, { key: newKey, selectData: '', productName: '', planWeight: 0, productCode: '', productionUnit: '', producedWeight: 0, pendingWeight: 0 }]
        });
    };

    // 添加报工明细行
    addReportRow = () => {
        const newKey = Date.now() + 1000;
        this.setState({
            reportList: [...this.state.reportList, { key: newKey, projectName: '新报工', specModel: '', unit: '', quantity: 0 }]
        });
    };

    render() {
        const { visible, loading } = this.props;
        const { productList, reportList } = this.state;

        return (
            <Modal
                title={
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span>生产工单</span>
                        <Button
                            size="small"
                            icon={<ThunderboltOutlined />}
                            onClick={this.randomFill}
                            style={{ marginRight: 24 }}
                        >
                            随机填充
                        </Button>
                    </div>
                }
                open={visible}
                footer={this.renderFooter()}
                width={1000}
                destroyOnClose
                confirmLoading={loading}
                style={{ top: '20px' }}
                bodyStyle={{
                    height: 'calc(100vh - 160px)',
                    overflowY: 'auto'
                }}
                onCancel={this.handleCancel}
            >
                <Form
                    ref={this.formRef}
                    layout="vertical"
                    initialValues={{
                        workOrderName: '2026年5月-生产工单-第1份',
                        orderStatus: '待派工',
                        startDate: dayjs('2026-05-06'),
                        endDate: null,
                        batchNo: 'SC-20260506095404001',
                        responsiblePerson: '易光莉',
                        totalBox70: '暂无内容',
                        totalBox80: '暂无内容',
                        totalOutput: '暂无内容',
                        totalInterval: '暂无内容',
                        netOutput: '暂无内容',
                        totalWaste: '暂无内容',
                        totalExcess: '暂无内容',
                        totalExcessWeight: '暂无内容',
                    }}
                >
                    {/* 生产信息区域 */}
                    <Card title="生产信息" size="small" style={{ marginBottom: 16 }}>
                        <div style={{ marginBottom: 8, color: '#666', fontSize: 12 }}>
                            <Tag color="blue">默认分组组、车间做"周"颗粒度生产派工工单</Tag>
                            <span style={{ marginLeft: 8 }}>使用Tips：生产工单通过标签页，可以一站式完成生产工单业务流程</span>
                        </div>
                        <Row gutter={24}>
                            <Col span={6}>
                                <Form.Item label="生产工单编号" name="workOrderNo">
                                    <Input placeholder="自动生成无需填写" disabled />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label="生产工单名称" name="workOrderName" rules={[{ required: true, message: '请输入工单名称' }]}>
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label="工单状态" name="orderStatus">
                                    <Select>
                                        <Option value="待派工">待派工</Option>
                                        <Option value="生产中">已派工</Option>
                                        <Option value="已完成">已完结</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label="工单开始日期" name="startDate">
                                    <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={24}>
                            <Col span={6}>
                                <Form.Item label="工单完工日期" name="endDate">
                                    <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" placeholder="未填写" />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label="产成品批次号" name="batchNo">
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label="工单负责人" name="responsiblePerson">
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                {/* 占位空白，保持布局对齐 */}
                            </Col>
                        </Row>
                    </Card>

                    {/* 生产产品明细表格 */}
                    <Card title="生产产品明细" size="small" style={{ marginBottom: 16 }} extra={
                        <Space>
                            <Button type="link" size="small" icon={<PlusOutlined />} onClick={this.addProductRow}>添加</Button>
                            <Button type="link" size="small">快速填报</Button>
                        </Space>
                    }>
                        <div style={{ overflowX: 'auto' }}>
                            <Table
                                dataSource={productList}
                                columns={this.productColumns}
                                pagination={false}
                                size="small"
                                rowKey="key"
                                bordered
                                scroll={{ x: 'max-content' }}
                                components={{
                                    header: {
                                        cell: (props: any) => (
                                            <th {...props} style={{ ...props.style, whiteSpace: 'nowrap' }} />
                                        )
                                    }
                                }}
                            />
                        </div>
                    </Card>

                    {/* 生产订单报工表格 */}
                    <Card title="生产订单报工" size="small" style={{ marginBottom: 16 }} extra={
                        <Space>
                            <Button type="link" size="small" icon={<PlusOutlined />} onClick={this.addReportRow}>添加</Button>
                            <Button type="link" size="small">快速填报</Button>
                        </Space>
                    }>
                        <Tabs
                            defaultActiveKey="luosi"
                            items={[
                                {
                                    key: 'luosi',
                                    label: '络丝',
                                    children: (
                                        <Table
                                            dataSource={reportList}
                                            columns={this.reportColumns}
                                            pagination={false}
                                            size="small"
                                            rowKey="key"
                                            bordered
                                        />
                                    ),
                                },
                                {
                                    key: 'nianxian',
                                    label: '捻线',
                                    children: (
                                        <Table
                                            dataSource={reportList}
                                            columns={this.reportColumns}
                                            pagination={false}
                                            size="small"
                                            rowKey="key"
                                            bordered
                                        />
                                    ),
                                },
                                {
                                    key: 'chengjiao',
                                    label: '成绞',
                                    children: (
                                        <Table
                                            dataSource={reportList}
                                            columns={this.reportColumns}
                                            pagination={false}
                                            size="small"
                                            rowKey="key"
                                            bordered
                                        />
                                    ),
                                },
                                {
                                    key: 'chengtong',
                                    label: '成筒',
                                    children: (
                                        <Table
                                            dataSource={reportList}
                                            columns={this.reportColumns}
                                            pagination={false}
                                            size="small"
                                            rowKey="key"
                                            bordered
                                        />
                                    ),
                                },
                            ]}
                        />
                    </Card>

                    {/* 合计信息区域 */}
                    <Card title="合计统计" size="small">
                        <Row gutter={[16, 16]}>
                            <Col span={6}>
                                <Form.Item label="合计生产框数（70个）" name="totalBox70">
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label="合计生产框数（80个）" name="totalBox80">
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label="合计产量" name="totalOutput">
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label="合计间隔" name="totalInterval">
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label="合计净产量" name="netOutput">
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label="合计废丝" name="totalWaste">
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label="合计多余个数" name="totalExcess">
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label="合计多余个数重量" name="totalExcessWeight">
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Card>
                </Form>
            </Modal>
        );
    }
}

export const AddWorkOrderModal = withTranslation()(_AddWorkOrderModal);