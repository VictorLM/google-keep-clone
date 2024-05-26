import { IsNumber, IsString, Max, MaxLength, Min } from "class-validator";

export class CreateAndUpdateNoteDTO {
  @IsString()
  @MaxLength(255)
  title!: string;

  @IsString()
  @MaxLength(1000)
  description!: string;

  @IsNumber()
  @Min(0.0000000000000000000000000000001)
  @Max(100000000000000)
  index!: number;
}
