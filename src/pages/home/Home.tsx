import Commerce from "@chec/commerce.js";
import { IonCol, IonContent, IonGrid, IonPage, IonRow } from "@ionic/react";
import { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import { Footer } from "../../components/global/Footer";
import { Header } from "../../components/global/Header";
import ProductCard from "../../components/product/product-card/ProductCard";
import { environment } from '../../environments/environment';
import "./Home.css";

const Home: React.FC<RouteComponentProps> = ({ history }) => {
  const [products, setProducts] = useState([]);

  let commerceKey = process.env.REACT_APP_CHEC_PUBLIC_KEY
  let envKey = environment.commerceApiKey

  useEffect(() => {
    const commerce = new Commerce(envKey);
    commerce.products
      .list({ active: 1 })
      .then((products) => setProducts(products.data));
  }, []);


  return (
    <IonPage>
      <Header hasCartButton={true} />
      <IonContent fullscreen>
        <Header large={true} hasTitleImage={false} />
        <IonGrid className="home">
          <IonRow>
            <IonCol className="ion-hide-md-up">
              <img src="assets/kiosko-toolbar.png" alt="Chop Chop" />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol className="ion-hide-md-down">
              <img src="assets/kiosko-toolbar.png" alt="Chop Chop" />
            </IonCol>
            <IonCol>
              <IonGrid>
                <IonRow>
                  {products.map((product) => {
                    console.log(product)
                    return (
                      <IonCol
                        size="12"
                        sizeSm="12"
                        sizeMd="12"
                        sizeLg="6"
                        sizeXl="6"
                        key={product.id}
                        className="ion-no-padding"
                      >
                        <ProductCard
                          product={product}
                          onSelectProduct={(product) => {
                            history.push(`/product/${product["id"]}`, {
                              product,
                            });
                          }}
                        />
                      </IonCol>
                    );
                  })}
                </IonRow>
              </IonGrid>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
      <Footer />
    </IonPage>
  );
};

export default Home;
