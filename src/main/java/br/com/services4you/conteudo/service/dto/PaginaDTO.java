package br.com.services4you.conteudo.service.dto;


import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the Pagina entity.
 */
public class PaginaDTO implements Serializable {

    private Long id;

    private String titulo;

    private String nome;

    private Long grupoId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Long getGrupoId() {
        return grupoId;
    }

    public void setGrupoId(Long grupoId) {
        this.grupoId = grupoId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        PaginaDTO paginaDTO = (PaginaDTO) o;
        if(paginaDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), paginaDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PaginaDTO{" +
            "id=" + getId() +
            ", titulo='" + getTitulo() + "'" +
            ", nome='" + getNome() + "'" +
            "}";
    }
}
