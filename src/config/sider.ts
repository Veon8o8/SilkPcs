// src/config/sider.ts

// 配置: 侧边栏菜单项配置

/** 菜单键 */
export const MENU_KEY = {
    // 首页
    Home: "Home",

    // 生产工单
    ProductionWorkOrder: "ProductionWorkOrder",

    // 生产领料
    ProductionMaterialRequest: "ProductionMaterialRequest",

    // 生产入库
    ProductionWarehouseReceipt: "ProductionWarehouseReceipt",

    // 生产退料
    ProductionMaterialReturn: "ProductionMaterialReturn",

    // 生产报工
    ProductionReporting: "ProductionReporting",

    // 生产数据统计
    ProductionDataStatistics: "ProductionDataStatistics",

    // 生产工序
    ProductionProcesses: "ProductionProcesses",
    // 络丝
    Winding: "Winding",
    // 捻线
    Twisting: "Twisting",
    // 成绞
    Hanking: "Hanking",
    // 成筒
    Coning: "Coning",
    // 生产工序看板
    ProductionProcessBoard: "ProductionProcessBoard",
};

/** 主菜单项 */
export const MENU = [
    { key: MENU_KEY.Home, label: 'front-page' },
    { key: MENU_KEY.ProductionWorkOrder, label: 'production-work-order' },
    { key: MENU_KEY.ProductionMaterialRequest, label: 'production-material-request' },
    { key: MENU_KEY.ProductionWarehouseReceipt, label: 'production-warehouse-receipt' },
    { key: MENU_KEY.ProductionMaterialReturn, label: 'production-material-return' },
    { key: MENU_KEY.ProductionReporting, label: 'production-reporting' },
    { key: MENU_KEY.ProductionDataStatistics, label: 'production-data-statistics' },
    { key: MENU_KEY.ProductionProcesses, label: 'production-processes' },
];

/** 子菜单项 */
export const SUBMENU = [
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [
        { key: MENU_KEY.Winding, label: 'winding' },
        { key: MENU_KEY.Twisting, label: 'twisting' },
        { key: MENU_KEY.Hanking, label: 'hanking' },
        { key: MENU_KEY.Coning, label: 'coning' },
        { key: MENU_KEY.ProductionProcessBoard, label: 'production-process-board' },
    ]
];