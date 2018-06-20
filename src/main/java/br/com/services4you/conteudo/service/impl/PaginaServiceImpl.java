package br.com.services4you.conteudo.service.impl;

import br.com.services4you.conteudo.service.PaginaService;
import br.com.services4you.conteudo.domain.Pagina;
import br.com.services4you.conteudo.repository.PaginaRepository;
import br.com.services4you.conteudo.service.dto.PaginaDTO;
import br.com.services4you.conteudo.service.mapper.PaginaMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing Pagina.
 */
@Service
@Transactional
public class PaginaServiceImpl implements PaginaService {

    private final Logger log = LoggerFactory.getLogger(PaginaServiceImpl.class);

    private final PaginaRepository paginaRepository;

    private final PaginaMapper paginaMapper;

    public PaginaServiceImpl(PaginaRepository paginaRepository, PaginaMapper paginaMapper) {
        this.paginaRepository = paginaRepository;
        this.paginaMapper = paginaMapper;
    }

    /**
     * Save a pagina.
     *
     * @param paginaDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public PaginaDTO save(PaginaDTO paginaDTO) {
        log.debug("Request to save Pagina : {}", paginaDTO);
        Pagina pagina = paginaMapper.toEntity(paginaDTO);
        pagina = paginaRepository.save(pagina);
        return paginaMapper.toDto(pagina);
    }

    /**
     * Get all the paginas.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<PaginaDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Paginas");
        return paginaRepository.findAll(pageable)
            .map(paginaMapper::toDto);
    }

    /**
     * Get one pagina by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public PaginaDTO findOne(Long id) {
        log.debug("Request to get Pagina : {}", id);
        Pagina pagina = paginaRepository.findOne(id);
        return paginaMapper.toDto(pagina);
    }

    /**
     * Delete the pagina by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Pagina : {}", id);
        paginaRepository.delete(id);
    }
}
