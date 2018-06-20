package br.com.services4you.conteudo.service.impl;

import br.com.services4you.conteudo.service.ConteudoService;
import br.com.services4you.conteudo.domain.Conteudo;
import br.com.services4you.conteudo.repository.ConteudoRepository;
import br.com.services4you.conteudo.service.dto.ConteudoDTO;
import br.com.services4you.conteudo.service.mapper.ConteudoMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing Conteudo.
 */
@Service
@Transactional
public class ConteudoServiceImpl implements ConteudoService {

    private final Logger log = LoggerFactory.getLogger(ConteudoServiceImpl.class);

    private final ConteudoRepository conteudoRepository;

    private final ConteudoMapper conteudoMapper;

    public ConteudoServiceImpl(ConteudoRepository conteudoRepository, ConteudoMapper conteudoMapper) {
        this.conteudoRepository = conteudoRepository;
        this.conteudoMapper = conteudoMapper;
    }

    /**
     * Save a conteudo.
     *
     * @param conteudoDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public ConteudoDTO save(ConteudoDTO conteudoDTO) {
        log.debug("Request to save Conteudo : {}", conteudoDTO);
        Conteudo conteudo = conteudoMapper.toEntity(conteudoDTO);
        conteudo = conteudoRepository.save(conteudo);
        return conteudoMapper.toDto(conteudo);
    }

    /**
     * Get all the conteudos.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<ConteudoDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Conteudos");
        return conteudoRepository.findAll(pageable)
            .map(conteudoMapper::toDto);
    }

    /**
     * Get one conteudo by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public ConteudoDTO findOne(Long id) {
        log.debug("Request to get Conteudo : {}", id);
        Conteudo conteudo = conteudoRepository.findOne(id);
        return conteudoMapper.toDto(conteudo);
    }

    /**
     * Delete the conteudo by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Conteudo : {}", id);
        conteudoRepository.delete(id);
    }
}
