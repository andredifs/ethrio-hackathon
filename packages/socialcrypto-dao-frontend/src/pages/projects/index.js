import React from 'react';
import ProjCard from '../../components/projectCard'

function Projects (){
    return(
        <>
            <div>
                <ProjCard
                    image="portando.png"
                    name="Menor Portando"
                    price={123}
                    description="Uma nft focada na arrecadação de recursos para a educação dos moradores de comunidade no Rio de Janeiro"
                />
            </div>
        </>
    );
}

export default Projects;