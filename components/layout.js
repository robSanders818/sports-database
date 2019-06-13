import Header from './header';

const layoutStyle = {
    margin: 20,
    padding: 20,
    border: '5px solid #adbbbd',
    background: '#adbbbc'
}

const Layout = props => (
    <div style={layoutStyle}>
        <Header />
        {props.children}
    </div>
);


export default Layout;