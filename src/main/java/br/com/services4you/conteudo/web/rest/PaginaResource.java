package br.com.services4you.conteudo.web.rest;

import com.codahale.metrics.annotation.Timed;
import br.com.services4you.conteudo.service.PaginaService;
import br.com.services4you.conteudo.web.rest.errors.BadRequestAlertException;
import br.com.services4you.conteudo.web.rest.util.HeaderUtil;
import br.com.services4you.conteudo.web.rest.util.PaginationUtil;
import br.com.services4you.conteudo.service.dto.PaginaDTO;
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
 * REST controller for managing Pagina.
 */
@RestController
@RequestMapping("/api")
public class PaginaResource {

    private final Logger log = LoggerFactory.getLogger(PaginaResource.class);

    private static final String ENTITY_NAME = "pagina";

    private final PaginaService paginaService;

    public PaginaResource(PaginaService paginaService) {
        this.paginaService = paginaService;
    }

    /**
     * POST  /paginas : Create a new pagina.
     *
     * @param paginaDTO the paginaDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new paginaDTO, or with status 400 (Bad Request) if the pagina has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/paginas")
    @Timed
    public ResponseEntity<PaginaDTO> createPagina(@RequestBody PaginaDTO paginaDTO) throws URISyntaxException {
        log.debug("REST request to save Pagina : {}", paginaDTO);
        if (paginaDTO.getId() != null) {
            throw new BadRequestAlertException("A new pagina cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PaginaDTO result = paginaService.save(paginaDTO);
        return ResponseEntity.created(new URI("/api/paginas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /paginas : Updates an existing pagina.
     *
     * @param paginaDTO the paginaDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated paginaDTO,
     * or with status 400 (Bad Request) if the paginaDTO is not valid,
     * or with status 500 (Internal Server Error) if the paginaDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/paginas")
    @Timed
    public ResponseEntity<PaginaDTO> updatePagina(@RequestBody PaginaDTO paginaDTO) throws URISyntaxException {
        log.debug("REST request to update Pagina : {}", paginaDTO);
        if (paginaDTO.getId() == null) {
            return createPagina(paginaDTO);
        }
        PaginaDTO result = paginaService.save(paginaDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, paginaDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /paginas : get all the paginas.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of paginas in body
     */
    @GetMapping("/paginas")
    @Timed
    public ResponseEntity<List<PaginaDTO>> getAllPaginas(Pageable pageable) {
        log.debug("REST request to get a page of Paginas");
        Page<PaginaDTO> page = paginaService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/paginas");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /paginas/:id : get the "id" pagina.
     *
     * @param id the id of the paginaDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the paginaDTO, or with status 404 (Not Found)
     */
    @GetMapping("/paginas/{id}")
    @Timed
    public ResponseEntity<PaginaDTO> getPagina(@PathVariable Long id) {
        log.debug("REST request to get Pagina : {}", id);
        PaginaDTO paginaDTO = paginaService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(paginaDTO));
    }

    /**
     * DELETE  /paginas/:id : delete the "id" pagina.
     *
     * @param id the id of the paginaDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/paginas/{id}")
    @Timed
    public ResponseEntity<Void> deletePagina(@PathVariable Long id) {
        log.debug("REST request to delete Pagina : {}", id);
        paginaService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
