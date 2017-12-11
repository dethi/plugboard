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
        $help_obj_simple = 'http://infoindustrielle.free.fr/Logique/Combi_pdf/Cours/Cours_06_32-42.pdf';
        $help_obj_medium = 'http://infoindustrielle.free.fr/Logique/Combi_pdf/Cours/Cours_10_69-81.pdf';

        $objectif = new Objectif();
        $objectif->title = 'NAND Gate';
        $objectif->description = 'A logic gate which produces a false output only if all its inputs are true.';
        $objectif->help = $help_obj_simple;
        $objectif->IONames = 'I1, I2, O';
        $objectif->nbInput = 2;
        $objectif->nbOutput = 1;
        $objectif->truth_table = '[[0, 0, 1], [1, 0, 1], [0, 1, 1], [1, 1, 0]]';
        $objectif->save();

        $objectif = new Objectif();
        $objectif->title = 'NOR Gate';
        $objectif->description = 'A logic gate which produces a true output only if all its inputs are false.';
        $objectif->help = $help_obj_simple;
        $objectif->IONames = 'I1, I2, O';
        $objectif->nbInput = 2;
        $objectif->nbOutput = 1;
        $objectif->truth_table = '[[0, 0, 1], [1, 0, 0], [0, 1, 0], [1, 1, 0]]';
        $objectif->save();

        $objectif = new Objectif();
        $objectif->title = 'XOR Gate';
        $objectif->description = 'A logic gate that gives a true output when the number of true inputs is odd.';
        $objectif->help = $help_obj_simple;
        $objectif->IONames = 'I1, I2, O';
        $objectif->nbInput = 2;
        $objectif->nbOutput = 1;
        $objectif->truth_table = '[[0, 0, 0], [1, 0, 1], [0, 1, 1], [1, 1, 0]]';
        $objectif->save();

        $objectif = new Objectif();
        $objectif->title = 'XNOR Gate';
        $objectif->description = 'A logic gate that give a true output when the inputs to the gate are the same.';
        $objectif->help = $help_obj_simple;
        $objectif->IONames = 'I1, I2, O';
        $objectif->nbInput = 2;
        $objectif->nbOutput = 1;
        $objectif->truth_table = '[[0, 0, 1], [1, 0, 0], [0, 1, 0], [1, 1, 1]]';
        $objectif->save();

        $objectif = new Objectif();
        $objectif->title = '2:1 Multiplexer';
        $objectif->description = 'The input A acts to control which input ( I0 or I1 ) gets passed to the output at Q';
        $objectif->help = $help_obj_medium;
        $objectif->IONames = 'A, I0, I1, Q';
        $objectif->nbInput = 3;
        $objectif->nbOutput = 1;
        $objectif->truth_table = '[[0, 0, 0, 0], [1, 0, 0, 0], [0, 1, 0, 1], [1, 1, 0, 0], [0, 0, 1, 0], [1, 0, 1, 1], [0, 1, 1, 1], [1, 1, 1, 1]]';
        $objectif->save();

        $objectif = new Objectif();
        $objectif->title = '1-bit Comparator';
        $objectif->description = 'Compare the inputs (A and B). Output O1 is true when A<B. O2 is true when A=B and 03 is true when A>B.';
        $objectif->help = $help_obj_medium;
        $objectif->IONames = 'A, B, O1, O2, 03';
        $objectif->nbInput = 2;
        $objectif->nbOutput = 3;
        $objectif->truth_table = '[[0, 0, 0, 1, 0], [1, 0, 0, 0, 1], [0, 1, 1, 0, 0], [1, 1, 0, 1, 0]]';
        $objectif->save();

        $objectif = new Objectif();
        $objectif->title = 'Half Adder';
        $objectif->description = 'A logic gate which adds two single binary digits (I1 and I2). It has two output: sum (S) and carry (C).';
        $objectif->help = $help_obj_medium;
        $objectif->IONames = 'I1, I2, C, S';
        $objectif->nbInput = 2;
        $objectif->nbOutput = 2;
        $objectif->truth_table = '[[0, 0, 0, 0], [1, 0, 0, 1], [0, 1, 0, 1], [1, 1, 1, 0]]';
        $objectif->save();

        $objectif = new Objectif();
        $objectif->title = 'Full Adder';
        $objectif->description = 'A logic gate which adds two single binary numbers (I1 and I2)  and accounts for values carried in as well as out. It has two output: sum (S) and carry (Co).';
        $objectif->help = $help_obj_medium;
        $objectif->IONames = 'I1, I2, Ci, Co, S';
        $objectif->nbInput = 3;
        $objectif->nbOutput = 2;
        $objectif->truth_table = '[[0, 0, 0, 0, 0], [1, 0, 0, 0, 1], [0, 1, 0, 0, 1], [1, 1, 0, 1, 0], [0, 0, 1, 0, 1], [1, 0, 1, 1, 0], [0, 1,1, 1, 0], [1, 1, 1, 1, 1]]';
        $objectif->save();

        $objectif = new Objectif();
        $objectif->title = '2-bit Full Adder';
        $objectif->description = 'A logic gate which adds two b2-bit binary numbers (P and Q) plus an additional carry-in (Ci). It has two outputs: sum (S) and carry (Co).';
        $objectif->help = $help_obj_medium;
        $objectif->IONames = 'P2, P1, Q2, Q1, Ci, Co, S2, S1';
        $objectif->nbInput = 5;
        $objectif->nbOutput = 3;
        $objectif->truth_table = '[[0, 0, 0, 0, 0, 0, 0, 0], [1, 0, 0, 0, 0, 0, 1, 0], [0, 1, 0, 0, 0, 0, 0, 1], [1, 1, 0, 0, 0, 0, 1, 1], [0, 0, 1, 0, 0, 0, 1, 0], [1, 0, 1, 0, 0, 1, 0, 0], [0, 1, 1, 0, 0, 0, 1, 1], [1, 1, 1, 0, 0, 1, 0, 1], [0, 0, 0, 1, 0, 0, 0, 1]
    , [1, 0, 0, 1, 0, 0, 1, 1], [0, 1, 0, 1, 0, 0, 1, 0], [1, 1, 0, 1, 0, 1, 0, 0], [0, 0, 1, 1, 0, 0, 1, 1], [1, 0, 1, 1, 0, 1, 0, 1], [0, 1, 1, 1, 0, 1, 0, 0], [1, 1, 1, 1, 0, 1, 1, 0], [0, 0, 0, 0, 1, 0, 0, 1], [1, 0, 0, 0, 1, 0, 1, 1
    ], [0, 1, 0, 0, 1, 0, 1, 0], [1, 1, 0, 0, 1, 1, 0, 0], [0, 0, 1, 0, 1, 0, 1, 1], [1, 0, 1, 0, 1, 1, 0, 1], [0, 1, 1, 0, 1, 1, 0, 0], [1, 1, 1, 0, 1, 1, 1, 0], [0, 0, 0, 1, 1, 0, 1, 0], [1, 0, 0, 1, 1, 1, 0, 0], [0, 1, 0, 1, 1, 0, 1, 
    1], [1, 1, 0, 1, 1, 1, 0, 1], [0, 0, 1, 1, 1, 1, 0, 0], [1, 0, 1, 1, 1, 1, 1, 0], [0, 1, 1, 1, 1, 1, 0, 1], [1, 1, 1, 1, 1, 1, 1, 1]]';
        $objectif->save();
    }
}
