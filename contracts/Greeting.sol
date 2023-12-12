// SPDX-License-Identifier: MIT
pragma solidity >=0.6.12 <0.9.0;

contract Greeting {
  /**
   * @dev Prints Hello World string
   */
        struct Disease{
        
        string name;
        string causes;
        string effects;
        string symptoms;
        string remedies;
      
       
    }
    mapping(uint256=>Disease)public diseases;
    uint256 public numberOfDiseases=0;
    
    
    function createDisease(string memory _name,string memory _causes,string memory _effects,string memory _symptoms,string memory _remedies)public returns(uint256){
        Disease storage disease=diseases[numberOfDiseases];
       
        disease.name=_name;
        disease.causes=_causes;
         disease.effects=_effects;
         disease.symptoms=_symptoms; 
          disease.remedies=_remedies; 
        numberOfDiseases++;
        return numberOfDiseases-1;
    }
function getDiseases()public view returns(Disease[]memory){
    Disease[]memory allDiseases=new Disease[](numberOfDiseases);
    for(uint i=0;i<numberOfDiseases;i++){
        Disease storage item=diseases[i];
        allDiseases[i]=item;
    }
   
    return allDiseases;
        }
}