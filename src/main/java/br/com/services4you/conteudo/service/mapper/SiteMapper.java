package br.com.services4you.conteudo.service.mapper;

import br.com.services4you.conteudo.domain.*;
import br.com.services4you.conteudo.service.dto.SiteDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Site and its DTO SiteDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface SiteMapper extends EntityMapper<SiteDTO, Site> {


    @Mapping(target = "grupos", ignore = true)
    Site toEntity(SiteDTO siteDTO);

    default Site fromId(Long id) {
        if (id == null) {
            return null;
        }
        Site site = new Site();
        site.setId(id);
        return site;
    }
}
