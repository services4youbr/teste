package br.com.services4you.conteudo.web.rest;

import br.com.services4you.conteudo.ProjetoConteudoApp;

import br.com.services4you.conteudo.domain.Conteudo;
import br.com.services4you.conteudo.repository.ConteudoRepository;
import br.com.services4you.conteudo.service.ConteudoService;
import br.com.services4you.conteudo.service.dto.ConteudoDTO;
import br.com.services4you.conteudo.service.mapper.ConteudoMapper;
import br.com.services4you.conteudo.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static br.com.services4you.conteudo.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the ConteudoResource REST controller.
 *
 * @see ConteudoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ProjetoConteudoApp.class)
public class ConteudoResourceIntTest {

    private static final Integer DEFAULT_ORDEM = 1;
    private static final Integer UPDATED_ORDEM = 2;

    private static final String DEFAULT_CONTEUDO = "AAAAAAAAAA";
    private static final String UPDATED_CONTEUDO = "BBBBBBBBBB";

    @Autowired
    private ConteudoRepository conteudoRepository;

    @Autowired
    private ConteudoMapper conteudoMapper;

    @Autowired
    private ConteudoService conteudoService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restConteudoMockMvc;

    private Conteudo conteudo;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ConteudoResource conteudoResource = new ConteudoResource(conteudoService);
        this.restConteudoMockMvc = MockMvcBuilders.standaloneSetup(conteudoResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Conteudo createEntity(EntityManager em) {
        Conteudo conteudo = new Conteudo()
            .ordem(DEFAULT_ORDEM)
            .conteudo(DEFAULT_CONTEUDO);
        return conteudo;
    }

    @Before
    public void initTest() {
        conteudo = createEntity(em);
    }

    @Test
    @Transactional
    public void createConteudo() throws Exception {
        int databaseSizeBeforeCreate = conteudoRepository.findAll().size();

        // Create the Conteudo
        ConteudoDTO conteudoDTO = conteudoMapper.toDto(conteudo);
        restConteudoMockMvc.perform(post("/api/conteudos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(conteudoDTO)))
            .andExpect(status().isCreated());

        // Validate the Conteudo in the database
        List<Conteudo> conteudoList = conteudoRepository.findAll();
        assertThat(conteudoList).hasSize(databaseSizeBeforeCreate + 1);
        Conteudo testConteudo = conteudoList.get(conteudoList.size() - 1);
        assertThat(testConteudo.getOrdem()).isEqualTo(DEFAULT_ORDEM);
        assertThat(testConteudo.getConteudo()).isEqualTo(DEFAULT_CONTEUDO);
    }

    @Test
    @Transactional
    public void createConteudoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = conteudoRepository.findAll().size();

        // Create the Conteudo with an existing ID
        conteudo.setId(1L);
        ConteudoDTO conteudoDTO = conteudoMapper.toDto(conteudo);

        // An entity with an existing ID cannot be created, so this API call must fail
        restConteudoMockMvc.perform(post("/api/conteudos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(conteudoDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Conteudo in the database
        List<Conteudo> conteudoList = conteudoRepository.findAll();
        assertThat(conteudoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllConteudos() throws Exception {
        // Initialize the database
        conteudoRepository.saveAndFlush(conteudo);

        // Get all the conteudoList
        restConteudoMockMvc.perform(get("/api/conteudos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(conteudo.getId().intValue())))
            .andExpect(jsonPath("$.[*].ordem").value(hasItem(DEFAULT_ORDEM)))
            .andExpect(jsonPath("$.[*].conteudo").value(hasItem(DEFAULT_CONTEUDO.toString())));
    }

    @Test
    @Transactional
    public void getConteudo() throws Exception {
        // Initialize the database
        conteudoRepository.saveAndFlush(conteudo);

        // Get the conteudo
        restConteudoMockMvc.perform(get("/api/conteudos/{id}", conteudo.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(conteudo.getId().intValue()))
            .andExpect(jsonPath("$.ordem").value(DEFAULT_ORDEM))
            .andExpect(jsonPath("$.conteudo").value(DEFAULT_CONTEUDO.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingConteudo() throws Exception {
        // Get the conteudo
        restConteudoMockMvc.perform(get("/api/conteudos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateConteudo() throws Exception {
        // Initialize the database
        conteudoRepository.saveAndFlush(conteudo);
        int databaseSizeBeforeUpdate = conteudoRepository.findAll().size();

        // Update the conteudo
        Conteudo updatedConteudo = conteudoRepository.findOne(conteudo.getId());
        // Disconnect from session so that the updates on updatedConteudo are not directly saved in db
        em.detach(updatedConteudo);
        updatedConteudo
            .ordem(UPDATED_ORDEM)
            .conteudo(UPDATED_CONTEUDO);
        ConteudoDTO conteudoDTO = conteudoMapper.toDto(updatedConteudo);

        restConteudoMockMvc.perform(put("/api/conteudos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(conteudoDTO)))
            .andExpect(status().isOk());

        // Validate the Conteudo in the database
        List<Conteudo> conteudoList = conteudoRepository.findAll();
        assertThat(conteudoList).hasSize(databaseSizeBeforeUpdate);
        Conteudo testConteudo = conteudoList.get(conteudoList.size() - 1);
        assertThat(testConteudo.getOrdem()).isEqualTo(UPDATED_ORDEM);
        assertThat(testConteudo.getConteudo()).isEqualTo(UPDATED_CONTEUDO);
    }

    @Test
    @Transactional
    public void updateNonExistingConteudo() throws Exception {
        int databaseSizeBeforeUpdate = conteudoRepository.findAll().size();

        // Create the Conteudo
        ConteudoDTO conteudoDTO = conteudoMapper.toDto(conteudo);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restConteudoMockMvc.perform(put("/api/conteudos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(conteudoDTO)))
            .andExpect(status().isCreated());

        // Validate the Conteudo in the database
        List<Conteudo> conteudoList = conteudoRepository.findAll();
        assertThat(conteudoList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteConteudo() throws Exception {
        // Initialize the database
        conteudoRepository.saveAndFlush(conteudo);
        int databaseSizeBeforeDelete = conteudoRepository.findAll().size();

        // Get the conteudo
        restConteudoMockMvc.perform(delete("/api/conteudos/{id}", conteudo.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Conteudo> conteudoList = conteudoRepository.findAll();
        assertThat(conteudoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Conteudo.class);
        Conteudo conteudo1 = new Conteudo();
        conteudo1.setId(1L);
        Conteudo conteudo2 = new Conteudo();
        conteudo2.setId(conteudo1.getId());
        assertThat(conteudo1).isEqualTo(conteudo2);
        conteudo2.setId(2L);
        assertThat(conteudo1).isNotEqualTo(conteudo2);
        conteudo1.setId(null);
        assertThat(conteudo1).isNotEqualTo(conteudo2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ConteudoDTO.class);
        ConteudoDTO conteudoDTO1 = new ConteudoDTO();
        conteudoDTO1.setId(1L);
        ConteudoDTO conteudoDTO2 = new ConteudoDTO();
        assertThat(conteudoDTO1).isNotEqualTo(conteudoDTO2);
        conteudoDTO2.setId(conteudoDTO1.getId());
        assertThat(conteudoDTO1).isEqualTo(conteudoDTO2);
        conteudoDTO2.setId(2L);
        assertThat(conteudoDTO1).isNotEqualTo(conteudoDTO2);
        conteudoDTO1.setId(null);
        assertThat(conteudoDTO1).isNotEqualTo(conteudoDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(conteudoMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(conteudoMapper.fromId(null)).isNull();
    }
}
