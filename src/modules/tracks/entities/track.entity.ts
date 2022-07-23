import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tracks' })
export class Track {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'smallint' })
  duration: number;

  @Column()
  artistId: string | null;

  @Column()
  albumId: string | null;
}
