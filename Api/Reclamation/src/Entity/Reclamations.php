<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Reclamations
 *
 * @ORM\Table(name="reclamations")
 * @ORM\Entity
 */
class Reclamations
{
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="date", type="string", length=100, nullable=false)
     */
    private $date;

    /**
     * @var string|null
     *
     * @ORM\Column(name="dateresoulution", type="string", length=50, nullable=true, options={"default"="NULL"})
     */
    private $dateresoulution = 'NULL';

    /**
     * @var int
     *
     * @ORM\Column(name="ajoutepar", type="integer", nullable=false)
     */
    private $ajoutepar;

    /**
     * @var int
     *
     * @ORM\Column(name="resolupar", type="integer", nullable=false)
     */
    private $resolupar;

    /**
     * @var string
     *
     * @ORM\Column(name="commentaire", type="text", length=65535, nullable=false)
     */
    private $commentaire;

    /**
     * @var int|null
     *
     * @ORM\Column(name="status", type="integer", nullable=true, options={"default"="NULL"})
     */
    private $status = 'NULL';

    /**
     * @var int
     *
     * @ORM\Column(name="idzone", type="integer", nullable=false)
     */
    private $idzone;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDate(): ?string
    {
        return $this->date;
    }

    public function setDate(string $date): self
    {
        $this->date = $date;

        return $this;
    }

    public function getDateresoulution(): ?string
    {
        return $this->dateresoulution;
    }

    public function setDateresoulution(?string $dateresoulution): self
    {
        $this->dateresoulution = $dateresoulution;

        return $this;
    }

    public function getAjoutepar(): ?int
    {
        return $this->ajoutepar;
    }

    public function setAjoutepar(int $ajoutepar): self
    {
        $this->ajoutepar = $ajoutepar;

        return $this;
    }

    public function getResolupar(): ?int
    {
        return $this->resolupar;
    }

    public function setResolupar(int $resolupar): self
    {
        $this->resolupar = $resolupar;

        return $this;
    }

    public function getCommentaire(): ?string
    {
        return $this->commentaire;
    }

    public function setCommentaire(string $commentaire): self
    {
        $this->commentaire = $commentaire;

        return $this;
    }

    public function getStatus(): ?int
    {
        return $this->status;
    }

    public function setStatus(?int $status): self
    {
        $this->status = $status;

        return $this;
    }

    public function getIdzone(): ?int
    {
        return $this->idzone;
    }

    public function setIdzone(int $idzone): self
    {
        $this->idzone = $idzone;

        return $this;
    }


}
