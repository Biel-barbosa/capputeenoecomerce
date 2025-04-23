import ProductsList from '../components/ProductsList'; // Importando diretamente da pasta components
import { products } from '../data/mockProducts'; // Supondo que seus dados estejam aqui

const HomePage = () => {
    return (
        <div>
            <h1>Bem-vindo ao Capputeeno!</h1>
            <ProductsList products={products} />
        </div>
    );
};

export default HomePage;