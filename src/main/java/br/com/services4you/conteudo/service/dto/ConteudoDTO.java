package br.com.services4you.conteudo.service.dto;


import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the Conteudo entity.
 */
public class ConteudoDTO implements Serializable {

    private Long id;

    private Integer ordem;

    private String conteudo;

    private Long paginaId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getOrdem() {
        return ordem;
    }

    public void setOrdem(Integer ordem) {
        this.ordem = ordem;
    }

    public String getConteudo() {
        return conteudo;
    }

    public void setConteudo(String conteudo) {
        this.conteudo = conteudo;
    }

    public Long getPaginaId() {
        return paginaId;
    }

    public void setPaginaId(Long paginaId) {
        this.paginaId = paginaId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ConteudoDTO conteudoDTO = (ConteudoDTO) o;
        if(conteudoDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), conteudoDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ConteudoDTO{" +
            "id=" + getId() +
            ", ordem=" + getOrdem() +
            ", conteudo='" + getConteudo() + "'" +
            "}";
    }
}
