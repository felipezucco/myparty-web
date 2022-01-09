import type { NextPage } from 'next'
import Link from 'next/link';
import { Card } from 'primereact/card';
import { Header, MenuItem, SideMenu } from './App.styled';
import { CreateLocal } from './local';


const Home: NextPage = () => {

  const ContentComponent = () => {
    return (
      <div>
        <CreateLocal />
      </div>
    )
  }

  const HeaderComponent = () => {
    return (
      <Header>
        Header
      </Header>
    )
  }

  return (
    <div className='p-d-flex p-jc-center p-mt-5'>
      <div className="p-col-align-center">
        <Card>
          <div className='p-d-flex'>
            <HeaderComponent />
            <ContentComponent />
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Home
