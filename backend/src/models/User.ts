import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, BeforeInsert, BeforeUpdate } from 'typeorm';
import { UserRole } from '../utils/constants';
import * as argon2 from 'argon2';
import { IsEmail, Length, IsEnum } from 'class-validator';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  @IsEmail({}, { message: 'Invalid email format' })
  email!: string;

  @Column({ select: false })
  @Length(8, 100, { message: 'Password must be between 8 and 100 characters' })
  password!: string;

  @Column()
  @Length(2, 50, { message: 'First name must be between 2 and 50 characters' })
  firstName!: string;

  @Column()
  @Length(2, 50, { message: 'Last name must be between 2 and 50 characters' })
  lastName!: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.Customer
  })
  @IsEnum(UserRole, { message: 'Invalid user role' })
  role!: UserRole;

  @Column({ nullable: true, type: 'varchar' })
  refreshToken?: string | null;

  @Column({ default: false })
  emailVerified!: boolean;

  @Column({ nullable: true, type: 'varchar' })
  emailVerificationToken?: string | null;

  @Column({ nullable: true, type: 'varchar' })
  passwordResetToken?: string | null;

  @Column({ nullable: true, type: 'timestamp' })
  passwordResetExpires?: Date | null;

  @Column({ nullable: true, type: 'timestamp' })
  lastLogin?: Date;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  constructor(partial?: Partial<User>) {
    if (partial) {
      Object.assign(this, partial);
    }
  }

  // Hash password before insert
  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    // Only hash the password if it's been modified (or is new)
    if (this.password) {
      this.password = await argon2.hash(this.password);
    }
  }

  // Method to compare passwords
  async comparePassword(candidatePassword: string): Promise<boolean> {
    return await argon2.verify(this.password, candidatePassword);
  }

  // Helper method to get full name
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
} 
