import Head from 'next/head';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/Card';

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Luma - Premium E-Commerce</title>
        <meta name="description" content="Premium soaps, shampoos, and personal care products." />
      </Head>
      
      <section className="container section">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-800 mb-4">
            Luma - Premium E-Commerce
          </h1>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Welcome to our premium soap and shampoo store. Discover luxury personal care products made with the finest ingredients.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button size="lg">Shop Now</Button>
            <Button variant="outline" size="lg">Learn More</Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {[1, 2, 3].map((item) => (
            <Card key={item} hoverable>
              <div className="h-64 bg-neutral-200"></div>
              <CardContent>
                <CardTitle className="mb-2">Premium Product {item}</CardTitle>
                <p className="text-neutral-600 mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vestibulum massa in justo sagittis.
                </p>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <span className="text-lg font-bold text-primary-700">$39.99</span>
                <Button>Add to Cart</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </Layout>
  );
}
