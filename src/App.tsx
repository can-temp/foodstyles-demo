import React from 'react';

import StyleListScreen from 'screens/StyleListScreen';
import { StateWrapper } from 'state/store';

export default function App(){
    return <StateWrapper>
        <StyleListScreen />
    </StateWrapper>
}
