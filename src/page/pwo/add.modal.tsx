// src/page/pwo/add.modal.tsx

import React from 'react';
import { Modal, Button, Form } from 'antd';
import { ThunderboltOutlined } from '@ant-design/icons';
import { withTranslation, WithTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import { ProductionInfoCard } from './components/ProductionInfoCard';
import { ProductDetailTable } from './components/ProductDetailTable';
import { WorkReportCard } from './components/WorkReportCard';
import { SummaryInfoCard } from './components/SummaryInfoCard';

interface AddWorkOrderModalProps extends WithTranslation {
    visible: boolean;
    loading?: boolean;
    onOk?: (values: any) => void;
    onCancel?: () => void;
}

interface AddWorkOrderModalState {
    productList: any[];
    luosiList: any[];
    nianxianList: any[];
    chengjiaoList: any[];
    chengtongList: any[];
}

class _AddWorkOrderModal extends React.Component<AddWorkOrderModalProps, AddWorkOrderModalState> {
    formRef = React.createRef<any>();

    constructor(props: AddWorkOrderModalProps) {
        super(props);
        this.state = {
            productList: [
                { key: '1', selectData: '', productName: '', planWeight: 0, productCode: '', productionUnit: '', producedWeight: 0, pendingWeight: 0 }
            ],
            luosiList: [
                { key: '1', projectName: '选件数据', specModel: '暂无内容', unit: '', quantity: 0 }
            ],
            nianxianList: [
                { key: '1', projectName: '选件数据', specModel: '暂无内容', unit: '', quantity: 0 }
            ],
            chengjiaoList: [
                { key: '1', projectName: '选件数据', specModel: '暂无内容', unit: '', quantity: 0 }
            ],
            chengtongList: [
                { key: '1', projectName: '选件数据', specModel: '暂无内容', unit: '', quantity: 0 }
            ],
        };
    }

    handleSubmit = () => {
        this.formRef.current?.validateFields().then((values: any) => {
            const formData = {
                ...values,
                workOrderNo: values.workOrderNo || '自动生成',
                productList: this.state.productList,
                luosiList: this.state.luosiList,
                nianxianList: this.state.nianxianList,
                chengjiaoList: this.state.chengjiaoList,
                chengtongList: this.state.chengtongList,
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

    handleCancel = () => {
        this.props.onCancel?.();
        this.formRef.current?.resetFields();
        this.setState({
            productList: [{ key: '1', selectData: '', productName: '', planWeight: 0, productCode: '', productionUnit: '', producedWeight: 0, pendingWeight: 0 }],
            luosiList: [{ key: '1', projectName: '选件数据', specModel: '暂无内容', unit: '', quantity: 0 }],
            nianxianList: [{ key: '1', projectName: '选件数据', specModel: '暂无内容', unit: '', quantity: 0 }],
            chengjiaoList: [{ key: '1', projectName: '选件数据', specModel: '暂无内容', unit: '', quantity: 0 }],
            chengtongList: [{ key: '1', projectName: '选件数据', specModel: '暂无内容', unit: '', quantity: 0 }],
        });
    };

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
            luosiList: [
                { key: Date.now() + 2, projectName: '络丝报工A', specModel: '规格1', unit: '个', quantity: 80 },
                { key: Date.now() + 3, projectName: '络丝报工B', specModel: '规格2', unit: '米', quantity: 200 }
            ],
            nianxianList: [
                { key: Date.now() + 4, projectName: '捻线报工A', specModel: '规格1', unit: '个', quantity: 60 },
                { key: Date.now() + 5, projectName: '捻线报工B', specModel: '规格2', unit: '米', quantity: 150 }
            ],
            chengjiaoList: [
                { key: Date.now() + 6, projectName: '成绞报工A', specModel: '规格1', unit: '个', quantity: 40 },
                { key: Date.now() + 7, projectName: '成绞报工B', specModel: '规格2', unit: '米', quantity: 100 }
            ],
            chengtongList: [
                { key: Date.now() + 8, projectName: '成筒报工A', specModel: '规格1', unit: '个', quantity: 30 },
                { key: Date.now() + 9, projectName: '成筒报工B', specModel: '规格2', unit: '米', quantity: 80 }
            ],
        });
    };

    renderFooter = () => {
        const { loading } = this.props;
        return [
            <Button key="submit" type="primary" loading={loading} onClick={this.handleSubmit}>提交</Button>,
            <Button key="saveDraft" onClick={() => console.log('保存草稿')}>保存草稿</Button>,
            <Button key="cancel" onClick={this.handleCancel}>取消</Button>
        ];
    };

    updateProductList = (newList: any[]) => {
        this.setState({ productList: newList });
    };

    updateLuosiList = (newList: any[]) => {
        this.setState({ luosiList: newList });
    };

    updateNianxianList = (newList: any[]) => {
        this.setState({ nianxianList: newList });
    };

    updateChengjiaoList = (newList: any[]) => {
        this.setState({ chengjiaoList: newList });
    };

    updateChengtongList = (newList: any[]) => {
        this.setState({ chengtongList: newList });
    };

    render() {
        const { visible, loading } = this.props;
        const { productList, luosiList, nianxianList, chengjiaoList, chengtongList } = this.state;

        return (
            <Modal
                title={
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span>生产工单</span>
                        <Button size="small" icon={<ThunderboltOutlined />} onClick={this.randomFill} style={{ marginRight: 24 }}>随机填充</Button>
                    </div>
                }
                open={visible}
                footer={this.renderFooter()}
                width={1000}
                destroyOnClose
                confirmLoading={loading}
                style={{ top: '20px' }}
                bodyStyle={{ height: 'calc(100vh - 160px)', overflowY: 'auto' }}
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
                    <ProductionInfoCard />
                    <ProductDetailTable productList={productList} onUpdateList={this.updateProductList} />
                    <WorkReportCard 
                        luosiList={luosiList}
                        nianxianList={nianxianList}
                        chengjiaoList={chengjiaoList}
                        chengtongList={chengtongList}
                        onUpdateLuosiList={this.updateLuosiList}
                        onUpdateNianxianList={this.updateNianxianList}
                        onUpdateChengjiaoList={this.updateChengjiaoList}
                        onUpdateChengtongList={this.updateChengtongList}
                    />
                    <SummaryInfoCard />
                </Form>
            </Modal>
        );
    }
}

export const AddWorkOrderModal = withTranslation()(_AddWorkOrderModal);