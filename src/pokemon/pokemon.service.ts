import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { isValidObjectId, Model } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';
import { isString } from 'class-validator';

@Injectable()
export class PokemonService {

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>) { }

  async create(createPokemonDto: CreatePokemonDto) {

    createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();

    try {
      const poke = await this.pokemonModel.create(createPokemonDto);
      return poke;
    }
    catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException(`Pokemon already exists ${JSON.stringify(error.keyValue)}`);
      }
      console.log(error);
      throw new InternalServerErrorException(`cant create pokemon, check server logs-`)

    }
  }

  findAll() {
    return `This action returns all pokemon`;
  }

  //have 3 cases to get , update or remove 
  // by name, by OID , by number
  async findOne(term: string) {

    let pokemon: Pokemon;
    if (!isNaN(+term)) { //is nan = its not a number
      pokemon = await this.pokemonModel.findOne({ no: term });
    }

    if (  !pokemon && isValidObjectId(term)) { // its a valid MONGO DB ID
      pokemon = await this.pokemonModel.findById(term);
    }

    if (!pokemon) { // if not found by no or id , then search by name
      pokemon = await this.pokemonModel.findOne({ name: term.toLowerCase().trim() });
    }

    if (!pokemon) { 
      throw new NotFoundException(`pokemon with id,name or no : ${term} not found` );
    }
    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {

    const pokemonBd  = await this.findOne(term);
    try{
    if(updatePokemonDto.name){
    updatePokemonDto.name = updatePokemonDto.name.toLowerCase();
    }
    await pokemonBd.updateOne(updatePokemonDto);

    return {...pokemonBd.toJSON(),...updatePokemonDto};
  }catch(error){
    this.handleExceptions(error);
  };
  

}
 async  remove(id: string) {

const{deletedCount} = await this.pokemonModel.deleteOne({_id:id});
if(deletedCount===0)
  throw new NotFoundException(`Pokemon with id ${id} not found`);
return `Pokemon with id ${id} deleted successfully`;
  }


private handleExceptions(error:any){

  if (error.code === 11000) {
    throw new BadRequestException(`Pokemon already exists with the  ${JSON.stringify(error.keyValue)}`);
  }
  console.log(error);
  throw new InternalServerErrorException(`cant create pokemon, check server logs-`)
}

}
