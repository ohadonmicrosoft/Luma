import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateInitialSchema1722421678002 implements MigrationInterface {
    name = 'CreateInitialSchema1722421678002'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Create enum types
        await queryRunner.query(`
            CREATE TYPE "user_role_enum" AS ENUM ('customer', 'admin', 'staff')
        `);
        
        await queryRunner.query(`
            CREATE TYPE "order_status_enum" AS ENUM ('pending', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded')
        `);
        
        await queryRunner.query(`
            CREATE TYPE "payment_status_enum" AS ENUM ('pending', 'paid', 'failed', 'refunded')
        `);

        // Create users table
        await queryRunner.query(`
            CREATE TABLE "users" (
                "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
                "email" varchar NOT NULL UNIQUE,
                "password" varchar NOT NULL,
                "firstName" varchar NOT NULL,
                "lastName" varchar NOT NULL,
                "role" "user_role_enum" NOT NULL DEFAULT 'customer',
                "refreshToken" varchar,
                "emailVerified" boolean NOT NULL DEFAULT false,
                "emailVerificationToken" varchar,
                "passwordResetToken" varchar,
                "passwordResetExpires" TIMESTAMP,
                "lastLogin" TIMESTAMP,
                "address" json,
                "preferences" json,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now()
            )
        `);

        // Create categories table with self-reference for hierarchical structure
        await queryRunner.query(`
            CREATE TABLE "categories" (
                "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
                "name" varchar(100) NOT NULL,
                "description" text,
                "image" varchar,
                "sortOrder" integer NOT NULL DEFAULT 0,
                "parent_id" uuid,
                "isActive" boolean NOT NULL DEFAULT true,
                "slug" varchar,
                "attributes" json,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "fk_category_parent" FOREIGN KEY ("parent_id") REFERENCES "categories"("id") ON DELETE SET NULL
            )
        `);
        
        // Create index on category name
        await queryRunner.query(`
            CREATE INDEX "idx_category_name" ON "categories"("name")
        `);

        // Create products table
        await queryRunner.query(`
            CREATE TABLE "products" (
                "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
                "name" varchar(100) NOT NULL,
                "description" text NOT NULL,
                "price" decimal(10,2) NOT NULL,
                "stock" integer NOT NULL DEFAULT 0,
                "sku" varchar,
                "isActive" boolean NOT NULL DEFAULT true,
                "isFeatured" boolean NOT NULL DEFAULT false,
                "images" text[],
                "attributes" json,
                "category_id" uuid,
                "averageRating" decimal(3,2) NOT NULL DEFAULT 0,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "fk_product_category" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE SET NULL
            )
        `);
        
        // Create indexes on product columns
        await queryRunner.query(`
            CREATE INDEX "idx_product_name" ON "products"("name")
        `);
        
        await queryRunner.query(`
            CREATE INDEX "idx_product_is_active_is_featured" ON "products"("isActive", "isFeatured")
        `);

        // Create orders table
        await queryRunner.query(`
            CREATE TABLE "orders" (
                "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
                "orderNumber" varchar NOT NULL UNIQUE,
                "user_id" uuid NOT NULL,
                "subtotal" decimal(10,2) NOT NULL,
                "tax" decimal(10,2) NOT NULL DEFAULT 0,
                "shipping" decimal(10,2) NOT NULL DEFAULT 0,
                "total" decimal(10,2) NOT NULL,
                "status" "order_status_enum" NOT NULL DEFAULT 'pending',
                "paymentStatus" "payment_status_enum" NOT NULL DEFAULT 'pending',
                "paymentMethod" varchar,
                "paymentId" varchar,
                "billingAddress" json,
                "shippingAddress" json,
                "trackingNumber" varchar,
                "shippingMethod" varchar,
                "notes" text,
                "isGift" boolean NOT NULL DEFAULT false,
                "giftMessage" text,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "fk_order_user" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE
            )
        `);
        
        // Create indexes on orders
        await queryRunner.query(`
            CREATE INDEX "idx_order_user" ON "orders"("user_id")
        `);
        
        await queryRunner.query(`
            CREATE INDEX "idx_order_status_created" ON "orders"("status", "createdAt")
        `);

        // Create order items table
        await queryRunner.query(`
            CREATE TABLE "order_items" (
                "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
                "order_id" uuid NOT NULL,
                "product_id" uuid NOT NULL,
                "productName" varchar(255) NOT NULL,
                "price" decimal(10,2) NOT NULL,
                "quantity" integer NOT NULL,
                "subtotal" decimal(10,2) NOT NULL,
                "productAttributes" json,
                "sku" varchar,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "fk_order_item_order" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE CASCADE,
                CONSTRAINT "fk_order_item_product" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE SET NULL
            )
        `);
        
        // Create index on order items
        await queryRunner.query(`
            CREATE INDEX "idx_order_item_order" ON "order_items"("order_id")
        `);

        // Create reviews table
        await queryRunner.query(`
            CREATE TABLE "reviews" (
                "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
                "user_id" uuid NOT NULL,
                "product_id" uuid NOT NULL,
                "rating" integer NOT NULL,
                "comment" text NOT NULL,
                "images" text[],
                "isVerifiedPurchase" boolean NOT NULL DEFAULT true,
                "helpfulVotes" integer NOT NULL DEFAULT 0,
                "isApproved" boolean NOT NULL DEFAULT false,
                "title" varchar,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "fk_review_user" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE,
                CONSTRAINT "fk_review_product" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE
            )
        `);
        
        // Create indexes on reviews
        await queryRunner.query(`
            CREATE INDEX "idx_review_product" ON "reviews"("product_id")
        `);
        
        await queryRunner.query(`
            CREATE INDEX "idx_review_user" ON "reviews"("user_id")
        `);

        // Create wishlist items table with unique constraint on user + product
        await queryRunner.query(`
            CREATE TABLE "wishlist_items" (
                "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
                "user_id" uuid NOT NULL,
                "product_id" uuid NOT NULL,
                "addedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "note" text,
                "notifyWhenInStock" boolean NOT NULL DEFAULT false,
                CONSTRAINT "fk_wishlist_user" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE,
                CONSTRAINT "fk_wishlist_product" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE,
                CONSTRAINT "uq_user_product" UNIQUE ("user_id", "product_id")
            )
        `);
        
        // Create indexes on wishlist
        await queryRunner.query(`
            CREATE INDEX "idx_wishlist_user" ON "wishlist_items"("user_id")
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop tables in reverse order to handle foreign key constraints
        await queryRunner.query(`DROP TABLE "wishlist_items"`);
        await queryRunner.query(`DROP TABLE "reviews"`);
        await queryRunner.query(`DROP TABLE "order_items"`);
        await queryRunner.query(`DROP TABLE "orders"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TABLE "categories"`);
        await queryRunner.query(`DROP TABLE "users"`);
        
        // Drop enum types
        await queryRunner.query(`DROP TYPE "payment_status_enum"`);
        await queryRunner.query(`DROP TYPE "order_status_enum"`);
        await queryRunner.query(`DROP TYPE "user_role_enum"`);
    }
} 
