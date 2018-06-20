package br.com.services4you.conteudo.service.mapper;

import br.com.services4you.conteudo.domain.*;
import br.com.services4you.conteudo.service.dto.PaginaDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Pagina and its DTO PaginaDTO.
 */
@Mapper(componentModel = "spring", uses = {GrupoMapper.class})
public interface PaginaMapper extends EntityMapper<PaginaDTO, Pagina> {

    @Mapping(source = "grupo.id", target = "grupoId")
    PaginaDTO toDto(Pagina pagina);

    @Mapping(source = "grupoId", target = "grupo")
    @Mapping(target = "conteudos", ignore = true)
    Pagina toEntity(PaginaDTO paginaDTO);

    default Pagina fromId(Long id) {
        if (id == null) {
            return null;
        }
        Pagina pagina = new Pagina();
        pagina.setId(id);
        return pagina;
    }
}
