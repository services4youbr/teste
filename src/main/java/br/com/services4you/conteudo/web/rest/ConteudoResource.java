package br.com.services4you.conteudo.web.rest;

import com.codahale.metrics.annotation.Timed;
import br.com.services4you.conteudo.service.ConteudoService;
import br.com.services4you.conteudo.web.rest.errors.BadRequestAlertException;
import br.com.services4you.conteudo.web.rest.util.HeaderUtil;
import br.com.services4you.conteudo.web.rest.util.PaginationUtil;
import br.com.services4you.conteudo.service.dto.ConteudoDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Conteudo.
 */
@RestController
@RequestMapping("/api")
public class ConteudoResource {

    private final Logger log = LoggerFactory.getLogger(ConteudoResource.class);

    private static final String ENTITY_NAME = "conteudo";

    private final ConteudoService conteudoService;

    public ConteudoResource(ConteudoService conteudoService) {
        this.conteudoService = conteudoService;
    }

    /**
     * POST  /conteudos : Create a new conteudo.
     *
     * @param conteudoDTO the conteudoDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new conteudoDTO, or with status 400 (Bad Request) if the conteudo has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/conteudos")
    @Timed
    public ResponseEntity<ConteudoDTO> createConteudo(@RequestBody ConteudoDTO conteudoDTO) throws URISyntaxException {
        log.debug("REST request to save Conteudo : {}", conteudoDTO);
        if (conteudoDTO.getId() != null) {
            throw new BadRequestAlertException("A new conteudo cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ConteudoDTO result = conteudoService.save(conteudoDTO);
        return ResponseEntity.created(new URI("/api/conteudos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /conteudos : Updates an existing conteudo.
     *
     * @param conteudoDTO the conteudoDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated conteudoDTO,
     * or with status 400 (Bad Request) if the conteudoDTO is not valid,
     * or with status 500 (Internal Server Error) if the conteudoDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/conteudos")
    @Timed
    public ResponseEntity<ConteudoDTO> updateConteudo(@RequestBody ConteudoDTO conteudoDTO) throws URISyntaxException {
        log.debug("REST request to update Conteudo : {}", conteudoDTO);
        if (conteudoDTO.getId() == null) {
            return createConteudo(conteudoDTO);
        }
        ConteudoDTO result = conteudoService.save(conteudoDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, conteudoDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /conteudos : get all the conteudos.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of conteudos in body
     */
    @GetMapping("/conteudos")
    @Timed
    public ResponseEntity<List<ConteudoDTO>> getAllConteudos(Pageable pageable) {
        log.debug("REST request to get a page of Conteudos");
        Page<ConteudoDTO> page = conteudoService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/conteudos");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /conteudos/:id : get the "id" conteudo.
     *
     * @param id the id of the conteudoDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the conteudoDTO, or with status 404 (Not Found)
     */
    @GetMapping("/conteudos/{id}")
    @Timed
    public ResponseEntity<ConteudoDTO> getConteudo(@PathVariable Long id) {
        log.debug("REST request to get Conteudo : {}", id);
        ConteudoDTO conteudoDTO = conteudoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(conteudoDTO));
    }

    /**
     * DELETE  /conteudos/:id : delete the "id" conteudo.
     *
     * @param id the id of the conteudoDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/conteudos/{id}")
    @Timed
    public ResponseEntity<Void> deleteConteudo(@PathVariable Long id) {
        log.debug("REST request to delete Conteudo : {}", id);
        conteudoService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
