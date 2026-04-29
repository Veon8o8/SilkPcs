
import React from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';

interface FramePwoProps<> {
}

class _FramePwo extends React.Component<WithTranslation & FramePwoProps> {
    render() {
        return (<>生产工单</>)
    }
}
export const FramePwo = withTranslation()(_FramePwo);