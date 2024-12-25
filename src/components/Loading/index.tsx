
import { Spin } from 'antd';
import './Loading.css';

function Loading() {
    return (
        <div className={'belle-skin_loading'}>
            <Spin tip={''} size={'large'} />
        </div>
    );
}

export default Loading;