import AsmaAlHusnaa from "@/components/layout/AsmaAlHusnaa";
import Banner from "@/components/layout/Banner";
import ContainerLayout from "@/components/layout/ContainerLayout";
import Home from "@/components/sections/Home";

const page = async () => {

  return <>
    <main className="w-full">
      <Banner />
      <ContainerLayout>
        <AsmaAlHusnaa />
        <div className="my-3">
          <Home />
        </div>
      </ContainerLayout>
    </main>
  </>;
};

export default page;