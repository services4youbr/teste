package br.com.services4you.conteudo.service.mapper;

import br.com.services4you.conteudo.domain.*;
import br.com.services4you.conteudo.service.dto.ConteudoDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Conteudo and its DTO ConteudoDTO.
 */
@Mapper(componentModel = "spring", uses = {PaginaMapper.class})
public interface ConteudoMapper extends EntityMapper<ConteudoDTO, Conteudo> {

    @Mapping(source = "pagina.id", target = "paginaId")
    ConteudoDTO toDto(Conteudo conteudo);

    @Mapping(source = "paginaId", target = "pagina")
    Conteudo toEntity(ConteudoDTO conteudoDTO);

    default Conteudo fromId(Long id) {
        if (id == null) {
            return null;
        }
        Conteudo conteudo = new Conteudo();
        conteudo.setId(id);
        return conteudo;
    }
}
