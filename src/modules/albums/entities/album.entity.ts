import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'album' })
export class Album {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  year: number;

  @Column()
  artistId: string | null;
}
