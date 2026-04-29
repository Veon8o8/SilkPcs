import React from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';

interface FramePwrProps<> {
}

class _FramePwr extends React.Component<WithTranslation & FramePwrProps> {
    render() {
        return (<>生产入库</>)
    }
}
export const FramePwr = withTranslation()(_FramePwr);