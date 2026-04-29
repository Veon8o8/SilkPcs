
import React from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';

interface FramePmrnProps<> {
}

class _FramePmrn extends React.Component<WithTranslation & FramePmrnProps> {
    render() {
        return (<>生产退料</>)
    }
}
export const FramePmrn = withTranslation()(_FramePmrn);