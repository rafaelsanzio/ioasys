export default interface IGetMovieDTO {
  id: string;
  name: string;
  type: string;
  actors: string[];
  director: string;
  avarage_votes: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}
