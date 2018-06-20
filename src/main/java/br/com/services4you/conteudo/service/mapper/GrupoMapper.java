package br.com.services4you.conteudo.service.mapper;

import br.com.services4you.conteudo.domain.*;
import br.com.services4you.conteudo.service.dto.GrupoDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Grupo and its DTO GrupoDTO.
 */
@Mapper(componentModel = "spring", uses = {SiteMapper.class})
public interface GrupoMapper extends EntityMapper<GrupoDTO, Grupo> {

    @Mapping(source = "site.id", target = "siteId")
    GrupoDTO toDto(Grupo grupo);

    @Mapping(source = "siteId", target = "site")
    @Mapping(target = "paginas", ignore = true)
    Grupo toEntity(GrupoDTO grupoDTO);

    default Grupo fromId(Long id) {
        if (id == null) {
            return null;
        }
        Grupo grupo = new Grupo();
        grupo.setId(id);
        return grupo;
    }
}
