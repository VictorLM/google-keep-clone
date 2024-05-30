import {
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from "class-validator";

export class CreateAndUpdateNoteDTO {
  @IsString({
    message: "Tipo do título inválido.",
  })
  @MaxLength(255, {
    message: "Título deve ter no máximo $constraint1 caracteres.",
  })
  title!: string;

  @IsString({
    message: "Tipo da descrição inválido.",
  })
  @MaxLength(1000, {
    message: "Descrição deve ter no máximo $constraint1 caracteres.",
  })
  description!: string;

  @IsNumber(
    {},
    {
      message: "Tipo do index inválido.",
    }
  )
  @Min(0.0000000000000000000000000000001, {
    message: "Valor mínimo do index é $constraint1.",
  })
  @Max(100000000000000, {
    message: "Valor máximo do index é $constraint1.",
  })
  index!: number;
}

export class SearchNoteDTO {
  @IsOptional()
  @IsString({
    message: "Tipo do termo pesquisado inválido.",
  })
  @MaxLength(255, {
    message: "Termo pesquisado deve ter no máximo $constraint1 caracteres.",
  })
  search: string;
}
