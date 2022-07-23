import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'track' })
export class Track {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  duration: number;

  @Column()
  artistId: string | null;

  @Column()
  albumId: string | null;
}
