package br.com.services4you.conteudo.service;

import br.com.services4you.conteudo.service.dto.ConteudoDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing Conteudo.
 */
public interface ConteudoService {

    /**
     * Save a conteudo.
     *
     * @param conteudoDTO the entity to save
     * @return the persisted entity
     */
    ConteudoDTO save(ConteudoDTO conteudoDTO);

    /**
     * Get all the conteudos.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<ConteudoDTO> findAll(Pageable pageable);

    /**
     * Get the "id" conteudo.
     *
     * @param id the id of the entity
     * @return the entity
     */
    ConteudoDTO findOne(Long id);

    /**
     * Delete the "id" conteudo.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
