<?php

use Illuminate\Database\Seeder;
use App\ElComponent;
use App\Objectif;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->call(ElComponentTableSeeder::class);
        $this->call(ObjectifsTableSeeder::class);
    }
}

class ElComponentTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $component = new ElComponent();
        $component->title = 'Input';
        $component->spec_name = 'INPUT';
        $component->type = 0;
        $component->nbInput = 0;
        $component->nbOutput = 1;
        $component->dimX = 1;
        $component->dimY = 1;
        $component->color = '#F2666F';
        $component->save();

        $component = new ElComponent();
        $component->title = 'Output';
        $component->spec_name = 'OUTPUT';
        $component->type = 1;
        $component->nbInput = 1;
        $component->nbOutput = 0;
        $component->dimX = 1;
        $component->dimY = 1;
        $component->color = '#F2666F';
        $component->save();

        $component = new ElComponent();
        $component->title = 'Not';
        $component->spec_name = 'GATE_NOT';
        $component->type = 2;
        $component->nbInput = 1;
        $component->nbOutput = 1;
        $component->dimX = 1;
        $component->dimY = 1;
        $component->color = '#1A936F';
        $component->truth_table = '[[0, 1], [1, 0]]';
        $component->save();

        $component = new ElComponent();
        $component->title = 'And';
        $component->spec_name = 'GATE_AND';
        $component->type = 2;
        $component->nbInput = 2;
        $component->nbOutput = 1;
        $component->dimX = 2;
        $component->dimY = 2;
        $component->color = '#1A936F';
        $component->truth_table = '[[0, 0, 0], [0, 1, 0], [1, 0, 0], [1, 1, 1]]';
        $component->save();

        $component = new ElComponent();
        $component->title = 'Or';
        $component->spec_name = 'GATE_OR';
        $component->type = 2;
        $component->nbInput = 2;
        $component->nbOutput = 1;
        $component->dimX = 2;
        $component->dimY = 2;
        $component->color = '#1A936F';
        $component->truth_table = '[[0, 0, 0], [0, 1, 1], [1, 0, 1], [1, 1, 1]]';
        $component->save();
    }
}

class ObjectifsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $objectif = new Objectif();
        $objectif->title = 'NAND Gate';
        $objectif->description = 'Réalisez une porte NON-ET';
        $objectif->nbInput = 2;
        $objectif->nbOutput = 1;
        $objectif->truth_table = '[[0, 0, 1], [1, 0, 1], [0, 1, 1], [1, 1, 0]]';
        $objectif->save();

        $objectif = new Objectif();
        $objectif->title = 'NOR Gate';
        $objectif->description = 'Réalisez une porte NON-OU';
        $objectif->nbInput = 2;
        $objectif->nbOutput = 1;
        $objectif->truth_table = '[[0, 0, 1], [1, 0, 0], [0, 1, 0], [1, 1, 0]]';
        $objectif->save();

        $objectif = new Objectif();
        $objectif->title = 'XOR Gate';
        $objectif->description = 'Réalisez une porte OU exclusif';
        $objectif->nbInput = 2;
        $objectif->nbOutput = 1;
        $objectif->truth_table = '[[0, 0, 0], [1, 0, 1], [0, 1, 1], [1, 1, 0]]';
        $objectif->save();

        $objectif = new Objectif();
        $objectif->title = 'XNOR Gate';
        $objectif->description = 'Réalisez une porte NON-OU exclusif';
        $objectif->nbInput = 2;
        $objectif->nbOutput = 1;
        $objectif->truth_table = '[[0, 0, 1], [1, 0, 0], [0, 1, 0], [1, 1, 1]]';
        $objectif->save();
    }
}
