import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Spin } from 'antd';
import Router from './router';
import { asyncUpdateUserInfo } from './store/account';
import { AppState } from './store';
import './App.less';

// 当前组件的类型声明
interface ConnectState {
  userInfo: object;
}

interface ConnectDispatch {
  asyncUpdateUserInfo: () => object;
}

interface Props extends ConnectState, ConnectDispatch {
}

interface State {
  isRender: boolean;
}

// 当前组件类
export default compose<React.ComponentClass>(
  connect<ConnectState, ConnectDispatch, Props>(
    (state: any | AppState) => ({
      userInfo: state.account.userInfo
    }),
    {
      asyncUpdateUserInfo
    }
  )
)(
  class App extends React.Component<Props, State> {
    public constructor(props: Props) {
      super(props);
      this.state = {
        // 控制是否可以渲染
        isRender: false
      };
    }


    public componentDidMount = async () => {
      const { props } = this;
      // 更新当前用户登陆状态
      await props.asyncUpdateUserInfo();
      this.setState({
        isRender: true
      });
    };

    public render = (): JSX.Element => {
      const { state } = this;
      if (state.isRender) {
        return (
          <section className='app-container'>
            <Router/>
          </section>
        );
      } else {
        return (
          <section className="loading-container">
            <Spin size="large"/>
          </section>
        );
      }
    }
  }
);
